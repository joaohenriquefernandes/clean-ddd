import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, it } from 'vitest'
import { FetchAnswerCommentUseCase } from './fetch-answer-comment'

describe('Fetch Answer Comment Use Case', () => {
  let answerCommentsRepository: InMemoryAnswerCommentRepository
  let answersRepository: InMemoryAnswerRepository
  let fetchAnswerCommentUseCase: FetchAnswerCommentUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentRepository()
    answersRepository = new InMemoryAnswerRepository()
    fetchAnswerCommentUseCase = new FetchAnswerCommentUseCase(
      answerCommentsRepository,
      answersRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    const { answerComments } = await fetchAnswerCommentUseCase.execute({
      answerId: answer.id.value,
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const { answerComments } = await fetchAnswerCommentUseCase.execute({
      answerId: answer.id.value,
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
