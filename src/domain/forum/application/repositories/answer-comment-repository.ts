import { IPaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>
  delete(answerCommentId: string): Promise<void>
}
