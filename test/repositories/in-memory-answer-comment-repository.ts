import { IAnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements IAnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
