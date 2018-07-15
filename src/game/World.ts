import { WorldInterface } from '../shared/types/World'
import CharacterStore from './stores/CharacterStore'
import BusinessStore from './stores/BusinessStore'
import { forEach, get } from 'lodash'
import TimeStore from './stores/TimeStore'
import produce from 'immer'

const World = (): WorldInterface => {
  const stores = {
    time: TimeStore(),
    characters: CharacterStore(),
    businesses: BusinessStore(),
  }

  let state = {}

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

  function getState() {
    return state
  }

  return {
    run,
    getState,
  }
}

export default World
