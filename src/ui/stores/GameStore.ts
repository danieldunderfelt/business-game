import { action, extendObservable, observable, reaction } from 'mobx'
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
      worldState: get(initialState, 'worldState', null),
      timeIncrement: get(initialState, 'timeIncrement', 1), // how many seconds to increment timePassed per second
      paused: get(initialState, 'paused', true),
      get isRunning() {
        return !!this.world && !this.paused
      },
    },
    {
      world: observable.struct,
    },
  )

  const setPaused = action(paused => (gameState.paused = paused))

  const setIncrement = action((increment: number = 1) => {
    if (increment > 0) {
      gameState.timeIncrement = Math.abs(increment)
    }
  })

  const setWorld = action((world: WorldInterface) => {
    gameState.world = world
  })

  const setWorldState = action(worldState => {
    gameState.worldState = worldState
  })

  function initialize() {
    if (!gameState.world) {
      setWorld(createWorld())
    }
  }

  const pauseLoop = () => setPaused(true)
  const runLoop = () => setPaused(false)

  const runWorld = action(async () => {
    if (gameState.world) {
      const worldState = await gameState.world.run(gameState.timeIncrement)
      setWorldState(worldState)
    }
  })

  reaction(
    () => gameState.isRunning,
    running => {
      if (running && !timerHandle) {
        timerHandle = timer(runWorld, TICK_INTERVAL)
      }

      if (!running && timerHandle) {
        cancelAnimationFrame(timerHandle.value)
        timerHandle = null
      }
    },
  )

  return {
    initialize,
    pauseLoop,
    runLoop,
    setIncrement,
    runWorld,
  }
}

export default GameStore
