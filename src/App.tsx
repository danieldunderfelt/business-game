import * as React from 'react'
import { Provider } from 'mobx-react'
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'
import Root from './ui/views/Root'
import 'normalize.css'
import { injectGlobal } from 'styled-components'
import { typography } from './ui/style/typography'
import { createStore } from 'mobx-app'
import GameStore from './ui/stores/GameStore'
import World from './game/World'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  ${typography}
`

function createWorld() {
  return World()
}

// Create state and actions from store factories
const { state, actions } = createStore({
  Game: GameStore(createWorld),
})

// Create pathricia router
const router = Router('/', createHistory())

const App = () => (
  <Provider state={state} actions={actions} router={router}>
    <Root />
  </Provider>
)

export default App
