import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, it } from 'vitest'
import { EditAnswerUseCase } from './edit-answer'

describe('Edit Answer Use Case', () => {
  let answersRepository: InMemoryAnswerRepository
  let editAnswerUseCase: EditAnswerUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    editAnswerUseCase = new EditAnswerUseCase(answersRepository)
  })

  it('should be able to edit an answer', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answersRepository.create(answer)

    await editAnswerUseCase.execute({
      answerId: answer.id.value,
      content: 'New Edit Content',
      authorId: 'author-1',
    })

    expect(answersRepository.items[0]).toMatchObject({
      content: 'New Edit Content',
    })
  })

  it('should not be able to edit an answer from another author', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answersRepository.create(answer)

    expect(() =>
      editAnswerUseCase.execute({
        answerId: answer.id.value,
        content: 'New Edit Content',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
