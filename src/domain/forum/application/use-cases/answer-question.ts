import { Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { IAnswerRepository } from '../repositories/answer-repository'

interface IAnswerQuestionUseCaseRequest {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(readonly ansersRepository: IAnswerRepository) {}

  async execute({
    authorId,
    content,
    questionId,
  }: IAnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId,
      content,
      questionId,
    })

    await this.ansersRepository.create(answer)

    return right({ answer })
  }
}
