import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { beforeEach, describe, it } from 'vitest'
import { FetchAnswerCommentUseCase } from './fetch-answer-comment'

describe('Fetch Answer Comment Use Case', () => {
  let answerCommentsRepository: InMemoryAnswerCommentRepository
  let fetchAnswerCommentUseCase: FetchAnswerCommentUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentRepository()
    fetchAnswerCommentUseCase = new FetchAnswerCommentUseCase(
      answerCommentsRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    const answer = makeAnswer()

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    const result = await fetchAnswerCommentUseCase.execute({
      answerId: answer.id.value,
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const answer = makeAnswer()

    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const result = await fetchAnswerCommentUseCase.execute({
      answerId: answer.id.value,
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
