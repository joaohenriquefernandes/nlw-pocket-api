import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoal } from '../../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/goals',
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
    handler: async (request, reply) => {
      const { desiredWeeklyFrequency, title } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    },
  })
}
