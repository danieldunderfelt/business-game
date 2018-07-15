import * as React from 'react'
import Route from '../helpers/Route'
import Index from './Index'

class Root extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Route path="/" component={Index} />
      </div>
    )
  }
}

export default Root
