interface IterationContract {
  currentTime: number
}

class Iteration implements IterationContract {
  currentTime = 0

  constructor(time) {
    this.currentTime = time
  }
}

export default Iteration
