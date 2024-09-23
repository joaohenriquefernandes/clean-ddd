import { Answer } from '../../enterprise/entities/answer'

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>
}
