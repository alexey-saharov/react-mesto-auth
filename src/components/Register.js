import Header from "./Header";
import React from "react";

function Register() {

  return (
    <div className="root">
      //todo Шапка для авторизованного и неавторизованного пользователя должна отличаться.
      <Header />
      <section className="auth root__section">
        <form
          // action="src/components/App#"
          // className={classNameForm}
          // onSubmit={onSubmit}
        >

          <h1 className="auth__title">Регистрация</h1>
          <input
            type="email"
            id="email"
            name="email"
            className="auth__input"
            required
            placeholder="Email"
            // value={name}
            // onChange={handleChangeName}
          />

          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="auth__input auth__input_margin"
            required
            placeholder="Пароль"
            // value={name}
            // onChange={handleChangeName}
          />

          <button
            aria-label="Зарегистрироваться"
            className="auth__button-submit"
            // onClick={}
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="auth__registered-text">
          Уже зарегистрированы? <a href="/login" className="auth__registered-text link">Войти</a>
        </p>

      </section>
    </div>
  );
}

export default Register;
