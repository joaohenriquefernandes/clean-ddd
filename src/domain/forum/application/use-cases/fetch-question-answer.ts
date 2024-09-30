import { Answer } from '../../enterprise/entities/answer'
import { IAnswerRepository } from '../repositories/answer-repository'

interface IFetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface IFetchQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(readonly answersRepository: IAnswerRepository) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionAnswerUseCaseRequest): Promise<IFetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}
