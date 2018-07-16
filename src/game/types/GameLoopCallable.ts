export interface GameLoopCallable {
  init: (state: any) => void
  run: (state: any) => void
}
