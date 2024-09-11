import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) {
  const [goal] = await db
    .insert(goals)
    .values({
      desiredWeeklyFrequency,
      title,
    })
    .returning()

  return { goal }
}
