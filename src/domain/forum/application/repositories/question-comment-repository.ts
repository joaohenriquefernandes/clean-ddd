import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
}
