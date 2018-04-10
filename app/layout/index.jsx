import React, { Component } from 'react'
import { HashRouter as Router, Route , Redirect, Switch } from 'react-router-dom'
import Data from '../context'
import { hot } from 'react-hot-loader'
import ReactCSS from 'react-css-modules'
import Swiggy from '@pages/swiggy/'
import { typeUrlMappings } from '@config'
import S from '@styles'
import Sidebar from '@components/side-bar'
import computation from '../computation'
import Dash from '../pages/swiggy/dashboard'

import s from './styles'


@ReactCSS({ ...S, ...s })
class Layout extends Component {

  render() {
    const data = computation[this.props.data.type](this.props.data.data)
    const parent = typeUrlMappings.filter(e => e.type === this.props.data.type)[0]
    return (
      <Data.Provider
        value={{
          data,
        }}
      >
        <Router>
          <div styleName="layout">
            <div styleName="left">
              <Sidebar data={parent} />
            </div>
            <div styleName="right">
                <Switch>
                  <Route path="/swiggy" component={Swiggy} />
                  <Redirect exact from="/" to={parent.path} />
                </Switch>
            </div>
          </div>
        </Router>
      </Data.Provider>
    )
  }
}

export default hot(module)(Layout)
