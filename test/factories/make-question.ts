import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return question
}
