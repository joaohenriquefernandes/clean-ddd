import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements IAnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.value === answerCommentId) ?? null
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: IPaginationParams,
  ): Promise<AnswerComment[]> {
    return this.items
      .filter((item) => item.answerId.value === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async delete(answerCommentId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.value === answerCommentId,
    )

    this.items.splice(index, 1)
  }
}
