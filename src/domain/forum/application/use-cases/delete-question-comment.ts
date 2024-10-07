import { IQuestionCommentRepository } from '../repositories/question-comment-repository'

interface IDeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

interface IDeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    readonly questionCommentsRepository: IQuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseRequest): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Comment not found.')
    }

    if (questionComment.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(questionCommentId)

    return {}
  }
}
