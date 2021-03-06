import * as faker from 'faker'
import { CharacterData, Gender } from '../../shared/types/Character'
import { GameLoopCallable } from '../types/GameLoopCallable'
import { get } from 'lodash'
import runCharacterActions from '../actions/runCharacterActions'
import runBusinessActions from '../actions/runBusinessActions'

const genders: Gender[] = [Gender.female, Gender.male]

function createCharacter(): CharacterData {
  const gender: number = faker.random.number(1)

  const character = {
    id: faker.random.uuid(),
    name: faker.name.findName('', '', gender),
    age: faker.random.number({ min: 18, max: 80 }),
    gender: genders[gender],
  }

  return character
}

const CharacterStore = (): GameLoopCallable => {
  function init() {
    const characters = []
    const max = 1000 // faker.random.number({ min: 100, max: 1000 })

    while (characters.length < max) {
      characters.push(createCharacter())
    }

    return {
      characters,
    }
  }

  function run(state) {
    return {
      characters: runCharacterActions(state),
    }
  }

  return {
    run,
    init,
  }
}

export default CharacterStore
