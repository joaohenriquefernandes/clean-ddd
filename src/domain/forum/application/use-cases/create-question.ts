import { Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { IQuestionRepository } from '../repositories/questions-repository'

interface ICreateQuestionUseCaseRequest {
  authorId: UniqueEntityId
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId, content, title })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
