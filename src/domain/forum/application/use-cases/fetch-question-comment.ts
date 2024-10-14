import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentRepository } from '../repositories/question-comment-repository'

interface IFetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentUseCase {
  constructor(
    readonly questionCommentsRepository: IQuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
