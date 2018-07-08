import { autorun, toJS } from 'mobx'
import timer from '../helpers/timer'
import gameStateActions from './gameStateActions'
import eventLoop from './eventLoop'

export default gameStore => {
  let timerHandle = null
  let eventsRunning = false
  const actions = gameStateActions(gameStore)

  autorun(() => {
    if (gameStore.isRunning && !timerHandle) {
      timerHandle = timer(tick, 1000)
    }

    if (!gameStore.isRunning && timerHandle) {
      cancelAnimationFrame(timerHandle.value)
      timerHandle = null
    }
  })

  async function tick() {
    actions.passTime()

    if (!eventsRunning) {
      console.log('Starting new event loop.')

      eventsRunning = true
      await eventLoop(gameStore)
      eventsRunning = false
    }
  }

  return {}
}
