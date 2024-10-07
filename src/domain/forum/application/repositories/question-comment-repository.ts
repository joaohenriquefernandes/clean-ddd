import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  delete(questionCommentId: string): Promise<void>
}
