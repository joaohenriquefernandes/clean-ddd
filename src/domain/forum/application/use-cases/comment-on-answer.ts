import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentRepository } from '../repositories/answer-comment-repository'
import { IAnswerRepository } from '../repositories/answer-repository'

interface ICommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface ICommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    readonly answerCommentsRepository: IAnswerCommentRepository,
    readonly answersRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityId(answerId),
      authorId: new UniqueEntityId(authorId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
