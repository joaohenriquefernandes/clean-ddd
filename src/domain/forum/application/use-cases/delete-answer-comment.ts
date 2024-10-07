import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'

interface IDeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}

interface IDeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(readonly answerCommentsRepository: IAnswerCommentRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Comment not found.')
    }

    if (answerComment.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerCommentId)

    return {}
  }
}
