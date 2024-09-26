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

    const { question } = await getQuestionBySlugUseCase.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(questionRepository.items[0].slug.value).toEqual(question.slug.value)
  })
})
