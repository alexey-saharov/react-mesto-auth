import React from 'react';
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header root__section header_margin_bottom">
      <a href="src/components/App#" className="header__logo link" style = {{ backgroundImage: `url(${logo})` }}></a>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
