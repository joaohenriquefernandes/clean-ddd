import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface IQuestionRepository {
  create(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: IPaginationParams): Promise<Question[]>
  delete(question: Question): Promise<void>
  save(questionId: string, question: Question): Promise<void>
}
