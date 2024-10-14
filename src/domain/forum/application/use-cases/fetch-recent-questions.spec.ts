import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, it } from 'vitest'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

describe('Fetch Recent Questions Use Case', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    fetchRecentQuestionsUseCase = new FetchRecentQuestionsUseCase(
      questionsRepository,
    )
  })

  it('should be able to fetch recent questions', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 22) }),
    )

    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 18) }),
    )

    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 23) }),
    )

    const result = await fetchRecentQuestionsUseCase.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsRepository.create(
        makeQuestion({ createdAt: new Date(2024, 0, 23) }),
      )
    }

    const result = await fetchRecentQuestionsUseCase.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
