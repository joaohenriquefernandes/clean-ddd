import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'

interface IFetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentUseCase {
  constructor(readonly answerCommentsRepository: IAnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: IFetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({ answerComments })
  }
}
