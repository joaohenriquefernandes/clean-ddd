import { Either, left, right } from '@/core/either'
import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IDeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(readonly answerCommentsRepository: IAnswerCommentRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerCommentId)

    return right({})
  }
}
