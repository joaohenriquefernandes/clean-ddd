import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'
import { IAnswerRepository } from '../repositories/answer-repository'

interface IFetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

interface IFetchAnswerCommentUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentUseCase {
  constructor(
    readonly answerCommentsRepository: IAnswerCommentRepository,
    readonly answersRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: IFetchAnswerCommentUseCaseRequest): Promise<IFetchAnswerCommentUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return { answerComments }
  }
}
