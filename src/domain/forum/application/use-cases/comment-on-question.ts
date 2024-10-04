import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentRepository } from '../repositories/question-comment-repository'
import { IQuestionRepository } from '../repositories/questions-repository'

interface ICommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface ICommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    readonly questionCommentsRepository: IQuestionCommentRepository,
    readonly questionsRepository: IQuestionRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: ICommentOnQuestionUseCaseRequest): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}
