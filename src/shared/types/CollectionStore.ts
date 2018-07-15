import { GameLoopCallable } from '../../game/types/GameLoopCallable'

export interface CollectionStore<ObjectType = GameLoopCallable> extends GameLoopCallable {
  add: (ObjectType) => void
}
