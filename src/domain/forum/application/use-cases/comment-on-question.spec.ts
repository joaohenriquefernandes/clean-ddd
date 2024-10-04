import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentOnQuestionUseCase } from './comment-on-question'

describe('Comment On Question Use Case', () => {
  let questionCommentsRepository: InMemoryQuestionCommentRepository
  let questionsRepository: InMemoryQuestionsRepository
  let commentOnQuestionUseCase: CommentOnQuestionUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    commentOnQuestionUseCase = new CommentOnQuestionUseCase(
      questionCommentsRepository,
      questionsRepository,
    )
  })

  it('should be able to create a comment on question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    await commentOnQuestionUseCase.execute({
      authorId: 'author-1',
      questionId: question.id.value,
      content: 'New Comment',
    })

    expect(questionCommentsRepository.items[0].content).toEqual('New Comment')
  })
})
