import * as React from 'react'
import { render } from 'react-dom'
import { configure, toJS } from 'mobx'
import App from './App'
import { createStore } from 'mobx-app'
import GameStore from './ui/stores/GameStore'
import World from './game/World'
import { Router } from 'pathricia'
import createHistory from 'history/createBrowserHistory'

configure({
  computedRequiresReaction: true,
  enforceActions: true,
})

// Create pathricia router
const router = Router('/', createHistory())
const mountNode = document.getElementById('app')

let state
let actions
let prevState = {}

function initStore(initialState = {}) {
  // Create state and actions from store factories
  const stores = createStore(
    {
      Game: GameStore(World),
    },
    initialState,
  )

  state = stores.state
  actions = stores.actions
}

function renderApp(Component) {
  render(<Component state={state} actions={actions} router={router} />, mountNode)
}

initStore(prevState)
renderApp(App)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(() => {
    initStore(prevState)
    const nextApp = require('./App').default
    renderApp(nextApp)
  })

  // @ts-ignore
  module.hot.dispose(() => {
    prevState = toJS(state)
  })
}
