import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import S from '@styles'

import s from './styles'

@ReactCSS({ ...S, ...s }, { allowMultiple: true })
class DashboardCard extends Component {
  render() {
    const {
      data,
    } = this.props
    return (
      <div styleName="dashboard-card-full card">
        <div styleName="columns">
          {
            data.map((data, i) => {
              return <div styleName="column card-info" key={i}>
                <div styleName="label">{data.label}</div>
                <div styleName="value">{data.value}</div>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default DashboardCard
