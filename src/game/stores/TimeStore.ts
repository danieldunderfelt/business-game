import { GameLoopCallable } from '../types/GameLoopCallable'
import { DateTime } from 'luxon'
import { get } from 'lodash'

const TimeStore = (): GameLoopCallable => {
  function run(state) {
    if (!state.epoch) {
      state.epoch = DateTime.local()
    }

    state.time = get(state, 'time', 0) + 1
  }

  return {
    run,
  }
}

export default TimeStore
