import { Question } from '../../enterprise/entities/question'
import { IAnswerRepository } from '../repositories/answer-repository'
import { IQuestionRepository } from '../repositories/questions-repository'

interface IChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    readonly questionsRepository: IQuestionRepository,
    readonly answersRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.value,
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question.id.value, question)

    return { question }
  }
}
