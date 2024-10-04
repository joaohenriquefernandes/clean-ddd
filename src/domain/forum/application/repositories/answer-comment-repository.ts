import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
}
