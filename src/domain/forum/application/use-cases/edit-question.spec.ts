import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, it } from 'vitest'
import { EditQuestionUseCase } from './edit-question'

describe('Edit Question Use Case', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let editQuestionUseCase: EditQuestionUseCase
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    editQuestionUseCase = new EditQuestionUseCase(questionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(question)

    await editQuestionUseCase.execute({
      questionId: 'question-1',
      title: 'New Edit Question',
      authorId: 'author-1',
      content: 'New Edit Content',
    })

    expect(questionsRepository.items[0]).toMatchObject({
      title: 'New Edit Question',
      content: 'New Edit Content',
    })
  })

  it('should not be able to edit a question from another author', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(question)

    expect(() =>
      editQuestionUseCase.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'New Edit Question',
        content: 'New Edit Content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
