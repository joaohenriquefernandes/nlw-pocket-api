import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/completions',
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
    handler: async (request, reply) => {
      const { goalId } = request.body

      await createGoalCompletion({
        goalId,
      })
    },
  })
}
