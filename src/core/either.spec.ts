import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, string> {
  if (x) {
    return right('success')
  } else {
    return left('error')
  }
}

test('sucess result', async () => {
  const successResult = doSomething(true)

  expect(successResult.isRight()).toBe(true)
})

test('error result', async () => {
  const errorResult = doSomething(false)

  expect(errorResult.isRight()).toBe(false)
})
