import { Question } from '../../enterprise/entities/question'
import { IQuestionRepository } from '../repositories/questions-repository'

interface IFetchRecentQuestionsUseCaseRequest {
  page: number
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
