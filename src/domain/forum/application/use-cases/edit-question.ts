import { IQuestionRepository } from '../repositories/questions-repository'

interface IEditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface IEditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(readonly questionsRepository: IQuestionRepository) {}

  async execute({
    authorId,
    content,
    questionId,
    title,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Not found.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(questionId, question)

    return {}
  }
}
