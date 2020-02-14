import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import Hero from './Hero'

function Header ({ isHomepage }) {
  return (
    <Fragment>
      <header>
        <Link to="/">
          <img src="/assets/logo.jpg" className="header-logo" alt="logo" />
        </Link>
        
        <ul className="header-menu">
          <li>
            <a href="https://github.com/ashwin-op">
              <img src="/assets/github.png" alt="GitHub logo" />
            </a>
          </li>
        </ul>
      </header>

      { isHomepage && <Hero /> }
    </Fragment>
  )
}

export default Header