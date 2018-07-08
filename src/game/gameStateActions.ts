import { action } from 'mobx'
import { DateTime } from 'luxon'

const gameStateActions = game => {
  const setStartDate = action((startDate: DateTime) => {
    game.startDate = startDate
  })

  const setPaused = action(paused => (game.paused = paused))

  const passTime = action(() => {
    const incrementBy = game.timeIncrement
    game.timePassed = game.timePassed + incrementBy
  })

  const setIncrement = action((increment: number = 1) => {
    if (increment > 0) {
      game.timeIncrement = Math.abs(increment)
    }
  })

  return {
    setStartDate,
    setPaused,
    passTime,
    setIncrement,
  }
}

export default gameStateActions
