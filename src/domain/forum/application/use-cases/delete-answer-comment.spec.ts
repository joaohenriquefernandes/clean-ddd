import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

describe('Delete AnswerComment Use Case', () => {
  let answerCommentsRepository: InMemoryAnswerCommentRepository
  let deleteAnswerCommentUseCase: DeleteAnswerCommentUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentRepository()
    deleteAnswerCommentUseCase = new DeleteAnswerCommentUseCase(
      answerCommentsRepository,
    )
  })

  it('should be able to delete an answer comment', async () => {
    const answerComment = makeAnswerComment()

    await answerCommentsRepository.create(answerComment)

    await deleteAnswerCommentUseCase.execute({
      answerCommentId: answerComment.id.value,
      authorId: answerComment.authorId.value,
    })

    expect(answerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer comment from another author', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await answerCommentsRepository.create(answerComment)

    expect(() =>
      deleteAnswerCommentUseCase.execute({
        answerCommentId: answerComment.id.value,
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
