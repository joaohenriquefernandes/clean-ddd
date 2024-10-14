import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'

describe('Create Question Use Case', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let createQuestion: CreateQuestionUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    createQuestion = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await createQuestion.execute({
      authorId: new UniqueEntityId(),
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.question.id).toEqual(expect.any(UniqueEntityId))
    expect(questionsRepository.items[0].id).toEqual(result.value?.question.id)
  })
})
