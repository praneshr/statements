import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ReactCSS from 'react-css-modules'
import logo from '@assets/logo'
import S from '@styles'

import s from './styles'

@ReactCSS({ ...S, ...s }, { allowMultiple: true })
class SideBar extends Component {

  parentDropdown = data => <div className="parent-dropdown">
    {data.name}
  </div>

  childNavLinks = data => {
    return data.map((c, i) => {
      return <NavLink
        key={i}
        exact
        to={c.path}
        styleName="nav-link"
        activeClassName={s.active}>
        <div styleName="menu-item">
          <span className="icon"></span>
          <span className="label">{c.name}</span>
        </div>
      </NavLink>
    })
  }

  render() {
    return (
      <div styleName="side-bar">
        <div styleName="has-text-centered">
          <img src={logo} alt="Logo" />
          <p styleName="des">
            Donec id elit non mi porta gravida at eget metus.
          </p>
          <div styleName="line" />
        </div>
        <div styleName="parent">
          {this.parentDropdown(this.props.data)}
        </div>
        <div styleName="child-nav">
          {this.childNavLinks(this.props.data.children)}
        </div>
        <div styleName="child-nav">
          <NavLink
            exact
            to="/about"
            styleName="nav-link"
            activeClassName={s.active}>
            <div styleName="menu-item">
              <span className="icon"></span>
              <span className="label">About</span>
            </div>
          </NavLink>
          <NavLink
            exact
            to="/contribute"
            styleName="nav-link"
            activeClassName={s.active}>
            <div styleName="menu-item">
              <span className="icon"></span>
              <span className="label">Contribute</span>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default SideBar
