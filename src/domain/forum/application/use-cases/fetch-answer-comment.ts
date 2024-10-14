import { Either, left, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'
import { IAnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IFetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentUseCase {
  constructor(
    readonly answerCommentsRepository: IAnswerCommentRepository,
    readonly answersRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: IFetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({ answerComments })
  }
}
