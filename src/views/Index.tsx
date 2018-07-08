import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { app } from 'mobx-app'
import { DateTime } from 'luxon'

export default inject(app('Game'))(
  observer(({ Game, state }) => (
    <div>
      <h1>Game simulator</h1>
      <h3>
        Game started at{' '}
        {!!state.startDate
          ? state.startDate.toLocaleString(DateTime.DATETIME_SHORT)
          : '[Not started]'}
      </h3>
      <h3>Game is {state.isRunning ? 'running' : 'paused'}.</h3>
      <h3>Time passed: {state.timePassed} seconds</h3>
      <p>
        <button onClick={() => Game.initialize()}>Initialize</button>
      </p>
      <p>
        <button onClick={() => Game.pause()}>Pause</button>
      </p>
      <p>
        <button onClick={() => Game.run()}>Run</button>
      </p>
    </div>
  )),
)
