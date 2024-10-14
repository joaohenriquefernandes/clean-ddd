import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { IAnswerRepository } from '../repositories/answer-repository'

interface IFetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswerUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswerUseCase {
  constructor(readonly answersRepository: IAnswerRepository) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
