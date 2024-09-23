import { Question } from '../../enterprise/entities/question'

export interface IQuestionRepository {
  create(question: Question): Promise<void>
}
