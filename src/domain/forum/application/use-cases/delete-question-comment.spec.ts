import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { beforeEach, describe, it } from 'vitest'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

describe('Delete Question Comment Use Case', () => {
  let questionCommentsRepository: InMemoryQuestionCommentRepository
  let deleteQuestionCommentUseCase: DeleteQuestionCommentUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentRepository()
    deleteQuestionCommentUseCase = new DeleteQuestionCommentUseCase(
      questionCommentsRepository,
    )
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentsRepository.create(questionComment)

    await deleteQuestionCommentUseCase.execute({
      questionCommentId: questionComment.id.value,
      authorId: questionComment.authorId.value,
    })

    expect(questionCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await questionCommentsRepository.create(questionComment)

    expect(() =>
      deleteQuestionCommentUseCase.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.value,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
