import { GameLoopCallable } from '../types/GameLoopCallable'
import { DateTime } from 'luxon'
import { get } from 'lodash'

const TimeStore = (): GameLoopCallable => {
  function run(state) {
    const time = get(state, 'time', 0) + 1

    return {
      time,
    }
  }

  function init(state) {
    let epoch = get(state, 'epoch', null)

    if (!epoch) {
      epoch = DateTime.local()
    }

    return {
      time: 0,
      epoch,
    }
  }

  return {
    run,
    init,
  }
}

export default TimeStore
