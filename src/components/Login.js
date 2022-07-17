import Header from "./Header";
import React from "react";

function Login() {

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
          <h1 className="auth__title">Вход</h1>
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
            aria-label="Войти"
            className="auth__button-submit"
            // onClick={}
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
