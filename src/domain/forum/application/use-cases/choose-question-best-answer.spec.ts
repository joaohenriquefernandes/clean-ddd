import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { NotAllowedError } from './errors/not-allowed-error'

describe('Choose Question Best Answer Use Case', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let answersRepository: InMemoryAnswerRepository
  let chooseQuestionBestAnswerUseCase: ChooseQuestionBestAnswerUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    answersRepository = new InMemoryAnswerRepository()
    chooseQuestionBestAnswerUseCase = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({ questionId: question.id })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    await chooseQuestionBestAnswerUseCase.execute({
      answerId: answer.id.value,
      authorId: question.authorId.value,
    })

    expect(questionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityId('author-1') })

    const answer = makeAnswer({ questionId: question.id })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    const result = await chooseQuestionBestAnswerUseCase.execute({
      answerId: answer.id.value,
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
