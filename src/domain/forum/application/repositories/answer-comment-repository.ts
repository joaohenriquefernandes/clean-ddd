import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  delete(answerCommentId: string): Promise<void>
}
