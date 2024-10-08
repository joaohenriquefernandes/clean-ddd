import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private _value: string

  get value() {
    return this._value
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }
}
