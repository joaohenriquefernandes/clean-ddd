import { IAnswerRepository } from '../repositories/answer-repository'

interface IEditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface IEditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(readonly answersRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answerId, answer)

    return {}
  }
}
