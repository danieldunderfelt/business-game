import { GameLoopCallable } from '../../game/types/GameLoopCallable'

export enum Gender {
  female,
  male,
}

export interface CharacterData extends GameObjectData {
  name: string
  age: number
  gender: Gender
}

export interface CharacterObject extends GameLoopCallable, CharacterData {}
