import { WorldInterface } from '../shared/types/World'
import CharacterStore from './stores/CharacterStore'
import BusinessStore from './stores/BusinessStore'
import { forEach, get } from 'lodash'
import TimeStore from './stores/TimeStore'
import produce from 'immer'

const World = (): WorldInterface => {
  const stores = [TimeStore(), CharacterStore(), BusinessStore()]
  let state: any = {}

  function run(seconds: number = 1) {
    let eventLoopIteration = 0
    let nextState = state

    for (eventLoopIteration; eventLoopIteration < seconds; eventLoopIteration++) {
      nextState = produce(nextState, draftState => {
        forEach(stores, store => store.run(draftState))
      })
    }

    state = nextState
    return state
  }

  return {
    run,
  }
}

export default World
