import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { beforeEach, describe, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer Question Use Case', () => {
  let answersRepository: InMemoryAnswerRepository
  let answerQuestionUseCase: AnswerQuestionUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository()
    answerQuestionUseCase = new AnswerQuestionUseCase(answersRepository)
  })

  it('shouls be able to answer a question', async () => {
    const { answer } = await answerQuestionUseCase.execute({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: 'Nova resposta',
    })

    console.log(answer)

    expect(answer.id).toBeTruthy()
    expect(answer.id).toEqual(expect.any(UniqueEntityId))
    expect(answersRepository.items[0].id).toEqual(answer.id)
  })
})
