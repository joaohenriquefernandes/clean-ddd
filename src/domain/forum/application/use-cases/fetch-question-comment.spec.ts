import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { beforeEach, describe, it } from 'vitest'
import { FetchQuestionCommentUseCase } from './fetch-question-comment'

describe('Fetch Question Comment Use Case', () => {
  let questionCommentsRepository: InMemoryQuestionCommentRepository
  let fetchQuestionCommentUseCase: FetchQuestionCommentUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentRepository()
    fetchQuestionCommentUseCase = new FetchQuestionCommentUseCase(
      questionCommentsRepository,
    )
  })

  it('should be able to fetch question comments', async () => {
    const question = makeQuestion()

    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )

    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )

    await questionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )

    const result = await fetchQuestionCommentUseCase.execute({
      questionId: question.id.value,
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({ questionId: question.id }),
      )
    }

    const result = await fetchQuestionCommentUseCase.execute({
      questionId: question.id.value,
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
