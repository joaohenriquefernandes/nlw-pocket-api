import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoal } from '../functions/create-goal'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app.withTypeProvider<ZodTypeProvider>().route({
  method: 'GET',
  url: '/pending-goals',
  handler: async (request, reply) => {
    const { pendingGoals } = await getWeekPendingGoals()

    return { pendingGoals }
  },
})
