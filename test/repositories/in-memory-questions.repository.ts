import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findById(id: string): Promise<Question | null> {
    return this.items.find((item) => item.id.value === id) ?? null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((item) => item.slug.value === slug) ?? null
  }

  async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
    return this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(index, 1)
  }

  async save(questionId: string, question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id.value === questionId)

    this.items[index] = question
  }
}
