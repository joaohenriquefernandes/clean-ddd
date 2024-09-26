import { Answer } from '../../enterprise/entities/answer'

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
}
