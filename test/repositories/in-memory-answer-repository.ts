import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements IAnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(answerId: string): Promise<Answer | null> {
    return this.items.find((item) => item.id.value === answerId) ?? null
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: IPaginationParams,
  ): Promise<Answer[]> {
    return this.items
      .filter((item) => item.questionId.value === questionId)
      .slice((page - 1) * 20, page * 20)
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.value === answer.id.value,
    )

    this.items.splice(index, 1)
  }

  async save(answerId: string, answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id.value === answerId)

    this.items[index] = answer
  }
}
