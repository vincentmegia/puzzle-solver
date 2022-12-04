import React from 'react'
import './Header.css'

class Header extends React.Component {
   render () {
      return (
         <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <a className="navbar-brand" href="/">
          Home
            </a>
         </nav>
      )
   }
}

export default Header
