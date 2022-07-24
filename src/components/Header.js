import React from 'react';
import logo from '../images/header-logo.svg';
import {Navigate, Route, Routes, useNavigate } from "react-router-dom";

function Header({ email, onClick }) {
  const history = useNavigate();

  return (
    <header className="header root__section header_margin_bottom">
      <div className="header__content">
        <a href="src/components/App#" className="header__logo link" style = {{ backgroundImage: `url(${logo})` }}></a>
        <Routes>
          <Route exact path="/sign-up" element={
            <button className="header__button link" onClick={() => {history('/sign-in')}}>Войти</button>
          } />
          <Route exact path="/sign-in" element={
            <button className="header__button link" onClick={() => {history('/sign-up')}}>Регистрация</button>
          } />
          <Route exact path="/" element={
            <div className="header__items">
              <p className="header__user">{email}</p>
              <button className="header__button link" onClick={onClick}>Выйти</button>
            </div>
          } />
          <Route path="*" element={
            <Navigate to={"/"} />
          } />
        </Routes>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
