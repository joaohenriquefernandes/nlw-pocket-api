import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/summary',
    handler: async (request, reply) => {
      const { summary } = await getWeekSummary()

      return { summary }
    },
  })
}
