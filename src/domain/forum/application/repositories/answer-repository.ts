import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>
  delete(answer: Answer): Promise<void>
  save(answerId: string, answer: Answer): Promise<void>
}
