import * as React from 'react'
import { Provider } from 'mobx-react'
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'
import App from './views/App'
import 'normalize.css'
import { injectGlobal } from 'styled-components'
import { typography } from './style/typography'
import { createStore } from 'mobx-app'
import Game from './game/Game'
import loop from './game/loop'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  ${typography}
`

const stores = {
  Game,
}

const { state, actions } = createStore(stores)
const router = Router('/', createHistory())

const AppContainer = () => (
  <Provider state={state} actions={actions} router={router}>
    <App />
  </Provider>
)

// Start the game loop
loop(state)

export default AppContainer
