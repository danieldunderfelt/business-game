import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { app } from 'mobx-app'
import { get } from 'lodash'
import { DateTime } from 'luxon'
import styled from 'styled-components'
import * as prettyjson from 'prettyjson'

const GameControls = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 25rem 10rem;
`

const GameObjects = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`

const GameObject = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0 0 1rem 1rem;
  flex: 1 0 15rem;

  pre {
    white-space: pre-line;
    margin: 0;
  }
`

export default inject(app('Game'))(
  observer(({ Game, state }) => (
    <div>
      <GameControls>
        <div>
          <h1 style={{ marginTop: 0 }}>Game simulator</h1>
          <p>Game is {state.isRunning ? 'running' : 'paused'}.</p>
          <p>Game world time: {get(state, 'worldState.time', 0)}</p>
        </div>
        <div>
          <p style={{ marginTop: '0.5rem' }}>
            <button onClick={() => Game.initialize()}>Initialize</button>
          </p>
          <p>
            <button onClick={() => Game.pauseLoop()}>Pause</button>
          </p>
          <p>
            <button onClick={() => Game.runLoop()}>Run loop</button>
          </p>
          <p>
            <button
              onClick={() => {
                Game.pauseLoop()
                Game.runWorld()
              }}>
              Run one
            </button>
          </p>
          <p>
            Game increment:{' '}
            <input
              type="number"
              value={state.timeIncrement}
              onChange={e => {
                const incrementValue = parseInt(e.target.value, 10)
                Game.setIncrement(incrementValue)
              }}
            />
          </p>
        </div>
      </GameControls>
      {state.worldState !== null && (
        <>
          <h3>Businesses</h3>
          <GameObjects>
            {get(state, 'worldState.businesses', []).map(({ id, ...business }) => (
              <GameObject key={id}>
                <pre>{prettyjson.render(business)}</pre>
              </GameObject>
            ))}
          </GameObjects>
          <h3>Characters</h3>
          <GameObjects>
            {get(state, 'worldState.characters', []).map(({ id, ...character }) => (
              <GameObject key={id}>
                <pre>{prettyjson.render(character)}</pre>
              </GameObject>
            ))}
          </GameObjects>
        </>
      )}
    </div>
  )),
)
