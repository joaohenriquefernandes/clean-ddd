import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentOnAnswerUseCase } from './comment-on-answer'

describe('Comment On Answer Use Case', () => {
  let answerCommentsRepository: InMemoryAnswerCommentRepository
  let answersRepository: InMemoryAnswerRepository
  let commentOnAnswerUseCase: CommentOnAnswerUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentRepository()
    answersRepository = new InMemoryAnswerRepository()
    commentOnAnswerUseCase = new CommentOnAnswerUseCase(
      answerCommentsRepository,
      answersRepository,
    )
  })

  it('should be able to create comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await commentOnAnswerUseCase.execute({
      authorId: 'author-1',
      content: 'New Comment',
      answerId: answer.id.value,
    })

    expect(answerCommentsRepository.items[0].content).toEqual('New Comment')
  })
})
