import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { IQuestionRepository } from '../repositories/questions-repository'

interface ICreateQuestionUseCaseRequest {
  authorId: UniqueEntityId
  title: string
  content: string
}

interface ICreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId, content, title })

    await this.questionsRepository.create(question)

    return { question }
  }
}
