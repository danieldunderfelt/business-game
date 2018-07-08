import { extendObservable, observable } from 'mobx'
import { DateTime } from 'luxon'
import gameStateActions from './gameStateActions'

const Game = state => {
  const gameState = extendObservable(
    state,
    {
      startDate: null,
      timePassed: 0, // in-game time passed in seconds
      timeIncrement: 1, // how many seconds to increment timePassed per second
      paused: false,
      get isRunning() {
        return !!this.startDate && !this.paused
      },
    },
    {
      startDate: observable.struct,
    },
  )

  const actions = gameStateActions(gameState)

  function initialize(startDate = DateTime.local()) {
    if (!gameState.startDate) {
      actions.setStartDate(startDate)
      // TODO generate businesses and people
    }
  }

  const pause = () => actions.setPaused(true)
  const run = () => actions.setPaused(false)

  return {
    initialize,
    pause,
    run,
  }
}

export default Game
