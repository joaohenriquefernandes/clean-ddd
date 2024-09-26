import { IQuestionRepository } from '../repositories/questions-repository'

interface IDeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Not found.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
