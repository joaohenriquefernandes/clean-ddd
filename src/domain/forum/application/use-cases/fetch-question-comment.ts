import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentRepository } from '../repositories/question-comment-repository'
import { IQuestionRepository } from '../repositories/questions-repository'

interface IFetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface IFetchQuestionCommentUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentUseCase {
  constructor(
    readonly questionCommentsRepository: IQuestionCommentRepository,
    readonly questionsRepository: IQuestionRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionCommentUseCaseRequest): Promise<IFetchQuestionCommentUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
