import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, it } from 'vitest'
import { FetchQuestionAnswerUseCase } from './fetch-question-answer'

describe('Fetch Question Answer Use Case', () => {
  let answersRepository: InMemoryAnswerRepository
  let fetchQuestionAnswerUseCase: FetchQuestionAnswerUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    fetchQuestionAnswerUseCase = new FetchQuestionAnswerUseCase(
      answersRepository,
    )
  })

  it('should be able to get questions answers', async () => {
    const question = makeQuestion()

    await answersRepository.create(makeAnswer({ questionId: question.id }))
    await answersRepository.create(makeAnswer({ questionId: question.id }))
    await answersRepository.create(makeAnswer({ questionId: question.id }))

    const result = await fetchQuestionAnswerUseCase.execute({
      questionId: question.id.value,
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated questions answers', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(makeAnswer({ questionId: question.id }))
    }

    const result = await fetchQuestionAnswerUseCase.execute({
      questionId: question.id.value,
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
