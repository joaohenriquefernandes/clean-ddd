import { Either, left, right } from '@/core/either'
import { IQuestionRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IEditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    authorId,
    content,
    questionId,
    title,
  }: IEditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(questionId, question)

    return right({})
  }
}
