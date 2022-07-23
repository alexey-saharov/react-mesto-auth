import React, { useState } from "react";

function Register({ onRegister, onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        onError();
        console.log(err.message);
      });
  }

  return (
    <section className="auth root__section">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1 className="auth__title">Регистрация</h1>
        <input
          type="email"
          id="email"
          name="email"
          className="auth__input"
          required
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          className="auth__input auth__input_margin"
          required
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button
          type="submit"
          aria-label="Зарегистрироваться"
          className="auth__button-submit"
        >
          Зарегистрироваться
        </button>

        <p className="auth__registered-text">
          Уже зарегистрированы? <a href="/sign-in" className="auth__registered-text link">Войти</a>
        </p>
      </form>
    </section>
  );
}

export default Register;
