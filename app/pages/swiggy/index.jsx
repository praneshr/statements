import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { typeUrlMappings } from '@config'
import Dashboard from './dashboard'

class Swiggy extends Component {
  render() {
    console.log('here');
    const { match } = this.props
    const { children } = typeUrlMappings.filter(p => p.type === 'swiggy')[0]
    const defaultChild = children.filter(c => c.isDefault)[0]
    return (
      <Switch>
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/spending`} />
        <Route exact path={`${match.url}/orders-restarunts`} />
        <Route exact path={`${match.url}/payments-delivery`} />
        <Redirect from={match.path} to={defaultChild.path} />
      </Switch>
    )
  }
}

export default Swiggy
