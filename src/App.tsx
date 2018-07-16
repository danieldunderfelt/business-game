import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import Root from './ui/views/Root'
import 'normalize.css'
import { injectGlobal } from 'styled-components'
import { typography } from './ui/style/typography'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  ${typography}
`

const App = ({ state, actions, router }) => (
  <Provider state={state} actions={actions} router={router}>
    <Root />
  </Provider>
)

export default hot(module)(App)
