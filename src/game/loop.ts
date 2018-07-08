import { autorun } from 'mobx'
import timer from '../helpers/timer'
import gameStateActions from './gameStateActions'

export default game => {
  let timerHandle = null
  const actions = gameStateActions(game)

  autorun(() => {
    if (game.isRunning && !timerHandle) {
      timerHandle = timer(tick, 1000)
    }

    if (!game.isRunning && timerHandle) {
      cancelAnimationFrame(timerHandle.value)
      timerHandle = null
    }
  })

  function tick() {
    actions.passTime()
  }

  return {}
}
