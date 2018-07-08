declare module '*.png' {
  const content: string
  export default content
}

declare module 'mobx-app' {
  import { IObservableArray, IObservableObject } from 'mobx'
  import { IStoresToProps } from 'mobx-react'

  interface StateActions {
    state: IObservableObject
    actions: any
  }

  type AnyFunction = (...args: any[]) => any

  export function createStore(stores: object, initialData?: object): StateActions
  export function app(
    ...keys: string[]
  ): IStoresToProps<{ state: IObservableObject } | StateActions>
  export function collection(
    collection: IObservableObject | IObservableArray,
    factoryOrName: string | AnyFunction,
    optName: string,
  )
}
