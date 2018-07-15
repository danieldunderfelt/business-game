import { CharacterObject, CharacterData } from '../../shared/types/Character'

const Character = (objectData: CharacterData): CharacterObject => {
  const character: CharacterObject = {
    ...objectData,
    onTick() {
      this.age = this.age + 1 / 31556926
    },
  }

  return character
}

export default Character
