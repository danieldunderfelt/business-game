import { GameLoopCallable } from '../../game/types/GameLoopCallable'
import { GameObjectData } from './GameObjectData'

export interface BusinessData extends GameObjectData {
  name: string
  founded: number
  employees: any[]
  funds: number
}

export interface BusinessObject extends GameLoopCallable, BusinessData {}
