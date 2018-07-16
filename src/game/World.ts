import { WorldInterface } from '../shared/types/World'
import CharacterStore from './stores/CharacterStore'
import BusinessStore from './stores/BusinessStore'
import TimeStore from './stores/TimeStore'
import { merge } from 'lodash'

const World = (): WorldInterface => {
  const stores = [TimeStore(), CharacterStore(), BusinessStore()]
  const state: any = {}

  function getStateFromStores(storeMethod = 'run') {
    let storeIdx = 0
    const storeCount = stores.length

    while (storeIdx < storeCount) {
      merge(state, stores[storeIdx][storeMethod](state))
      storeIdx++
    }
  }

  getStateFromStores('init')

  async function run(seconds: number = 1) {
    let eventLoopIteration = 0

    while (eventLoopIteration < seconds) {
      getStateFromStores()
      eventLoopIteration++
    }

    return state
  }

  return {
    run,
  }
}

export default World
