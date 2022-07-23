import React from 'react';
import logo from '../images/header-logo.svg';

//todo Шапка для авторизованного и неавторизованного пользователя должна отличаться.

function Header({ email, buttonText, onButtonClick }) {
  return (
    <header className="header root__section header_margin_bottom">
      <div className="header__content">
        <a href="src/components/App#" className="header__logo link" style = {{ backgroundImage: `url(${logo})` }}></a>
        <div className="header__items">
          <p className="header__user">{email}</p>
          <button className="header__button link" onClick={onButtonClick}>{buttonText}</button>
        </div>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
