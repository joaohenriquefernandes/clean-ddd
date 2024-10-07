import { IQuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements IQuestionCommentRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    return (
      this.items.find((item) => item.id.value === questionCommentId) ?? null
    )
  }

  async delete(questionCommentId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.value === questionCommentId,
    )
    this.items.splice(index, 1)
  }
}
