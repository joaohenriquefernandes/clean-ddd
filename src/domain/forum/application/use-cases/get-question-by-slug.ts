import { Question } from '../../enterprise/entities/question'
import { IQuestionRepository } from '../repositories/questions-repository'

interface IGetQuestionBySlugUseCaseRequest {
  slug: string
}

interface IGetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseRequest): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
