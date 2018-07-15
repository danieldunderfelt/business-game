import * as faker from 'faker'
import Character from '../objects/Character'
import { GameLoopCallable } from '../types/GameLoopCallable'
import { CharacterData, CharacterObject, Gender } from '../../shared/types/Character'

const genders: Gender[] = [Gender.female, Gender.male]

function createCharacter(): CharacterData {
  const gender: number = faker.random.number(1)

  const character = Character({
    id: faker.random.uuid(),
    name: faker.name.findName('', '', gender),
    age: faker.random.number({ min: 18, max: 80 }),
    gender: genders[gender],
  })

  return character
}

interface CharacterStoreInterface extends GameLoopCallable {
  addCharacter: (CharacterObject) => void
}

const CharacterStore = (): CharacterStoreInterface => {
  const characters: CharacterObject[] = []

  const addCharacter = character => {
    characters.push(character)
  }

  const max = faker.random.number({ min: 100, max: 50 })

  while (characters.length < max) {
    addCharacter(createCharacter())
  }

  function onTick() {
    characters.forEach(char => char.onTick())
    const firstChar = characters[0]
    console.log(`${firstChar.name}, ${firstChar.age} years old.`)
  }

  return {
    addCharacter,
    onTick,
  }
}

export default CharacterStore
