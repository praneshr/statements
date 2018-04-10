import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import S from '@styles'
import s from './styles'

@ReactCSS({ ...S, ...s }, { allowMultiple: true })
class PageTemplate extends Component {
  render() {
    const {
      title,
      children,
    } = this.props
    return (
      <div styleName="page-template">
        <div styleName="header title is-big">
          {title}
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    )
  }
}

export default PageTemplate
