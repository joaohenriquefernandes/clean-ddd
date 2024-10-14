import { Either, left, right } from '@/core/either'
import { IAnswerRepository } from '../repositories/answer-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IEditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditAnswerUseCase {
  constructor(readonly answersRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: IEditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answerId, answer)

    return right({})
  }
}
