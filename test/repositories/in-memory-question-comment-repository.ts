import { IQuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements IQuestionCommentRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
