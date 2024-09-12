import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/pending-goals',
    handler: async (request, reply) => {
      const { pendingGoals } = await getWeekPendingGoals()

      return { pendingGoals }
    },
  })
}
