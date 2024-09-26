import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question'

describe('Delete Question Use Case', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let deleteQuestionUseCase: DeleteQuestionUseCase
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    deleteQuestionUseCase = new DeleteQuestionUseCase(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(question)

    await deleteQuestionUseCase.execute({
      questionId: question.id.value,
      authorId: 'author-1',
    })

    expect(questionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(question)

    expect(() =>
      deleteQuestionUseCase.execute({
        questionId: question.id.value,
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
