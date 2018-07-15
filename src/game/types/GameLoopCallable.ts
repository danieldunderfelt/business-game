export interface GameLoopCallable {
  batch?: (state: any) => void
  run: (state: any) => void
}
