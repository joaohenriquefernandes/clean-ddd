import { IAnswerRepository } from '../repositories/answer-repository'

interface IDeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(readonly answersRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Not found.')
    }

    if (answer.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
