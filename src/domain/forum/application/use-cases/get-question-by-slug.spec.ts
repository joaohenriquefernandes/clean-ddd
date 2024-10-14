import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, it } from 'vitest'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('get Question By Slug Use Case', () => {
  let questionRepository: InMemoryQuestionsRepository
  let getQuestionBySlugUseCase: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await questionRepository.create(newQuestion)

    const result = await getQuestionBySlugUseCase.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.question.id.value).toEqual(newQuestion.id.value)
  })
})
