import CharacterStore from './stores/CharacterStore'

export interface WorldInterface {
  run: (seconds: number) => number
  getTime: () => number
}

const World = (): WorldInterface => {
  let time = 0
  const characters = CharacterStore()

  function run(seconds) {
    let eventLoopIteration = 0

    for (eventLoopIteration; eventLoopIteration < seconds; eventLoopIteration++) {
      time++
      runIteration()
    }

    return time
  }

  function runIteration() {
    characters.onTick()
  }

  function getTime() {
    return time
  }

  return {
    run,
    getTime,
  }
}

export default World
