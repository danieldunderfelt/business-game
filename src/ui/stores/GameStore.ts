import { action, autorun, extendObservable, observable } from 'mobx'
import { DateTime } from 'luxon'
import timer from '../helpers/timer'
import { get } from 'lodash'
import { WorldInterface } from '../../shared/types/World'

const TICK_INTERVAL = 1000

const GameStore = createWorld => (state, initialState) => {
  let timerHandle = null

  const gameState = extendObservable(
    state,
    {
      world: get(initialState, 'world', null),
      worldState: get(initialState, 'worldState', {}),
      startDate: get(initialState, 'startDate', null),
      timeIncrement: get(initialState, 'timeIncrement', 1), // how many seconds to increment timePassed per second
      paused: get(initialState, 'paused', true),
      get isRunning() {
        return !!this.world && !!this.startDate && !this.paused
      },
    },
    {
      startDate: observable.struct,
      world: observable.struct,
    },
  )

  const setStartDate = action((startDate: DateTime) => {
    gameState.startDate = startDate
  })

  const setWorldState = action(worldState => {
    gameState.worldState = worldState
  })

  const setPaused = action(paused => (gameState.paused = paused))

  const setIncrement = action((increment: number = 1) => {
    if (increment > 0) {
      gameState.timeIncrement = Math.abs(increment)
    }
  })

  const setWorld = action((world: WorldInterface) => {
    gameState.world = world
  })

  function initialize(startDate = DateTime.local()) {
    if (!gameState.world) {
      setStartDate(startDate)
      setWorld(createWorld())
    }
  }

  const pauseLoop = () => setPaused(true)
  const runLoop = () => setPaused(false)

  function runWorld() {
    if (gameState.world) {
      console.time('world')
      const worldState = gameState.world.run(gameState.timeIncrement)
      setWorldState(worldState)
      console.timeEnd('world')
    }
  }

  autorun(() => {
    if (gameState.isRunning && !timerHandle) {
      timerHandle = timer(runWorld, TICK_INTERVAL)
    }

    if (!gameState.isRunning && timerHandle) {
      cancelAnimationFrame(timerHandle.value)
      timerHandle = null
    }
  })

  return {
    initialize,
    pauseLoop,
    runLoop,
    setIncrement,
    runWorld,
  }
}

export default GameStore
