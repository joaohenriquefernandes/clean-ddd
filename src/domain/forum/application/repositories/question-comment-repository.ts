import { IPaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionCommentId: string): Promise<void>
}
