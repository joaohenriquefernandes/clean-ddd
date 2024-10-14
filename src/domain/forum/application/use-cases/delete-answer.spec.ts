import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'

describe('Delete Answer Use Case', () => {
  let answersRepository: InMemoryAnswerRepository
  let deleteAnswerUseCase: DeleteAnswerUseCase
  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    deleteAnswerUseCase = new DeleteAnswerUseCase(answersRepository)
  })

  it('should be able to delete an answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answersRepository.create(answer)

    await deleteAnswerUseCase.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(answersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another author', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answersRepository.create(answer)

    const result = await deleteAnswerUseCase.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
