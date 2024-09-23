import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { IAnswerRepository } from '../repositories/answer-repository'

interface IAnswerQuestionUseCaseRequest {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

interface IAnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(readonly ansersRepository: IAnswerRepository) {}

  async execute({
    authorId,
    content,
    questionId,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId,
      content,
      questionId,
    })

    await this.ansersRepository.create(answer)

    return { answer }
  }
}
