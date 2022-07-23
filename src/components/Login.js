import Header from "./Header";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //todo добавить отображение результата успешного/неуспешного входа

    console.log('1');

    onLogin({email, password})
      .then(
        () => {
          console.log('2');
          history('/');
        })
      .then(() => {
        console.log('3');
        resetForm();
      })
      .catch(() => {
          console.log('4');
          // (err) => setMessage(err)
        }
      );
  }

  return (
    <div className="root">
      <Header />
      <section className="auth root__section">
        <form
          onSubmit={handleSubmit}
        >
          <h1 className="auth__title">Вход</h1>
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
            id="userPassword"
            name="userPassword"
            className="auth__input auth__input_margin"
            required
            placeholder="Пароль"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <button
            type="submit"
            aria-label="Войти"
            className="auth__button-submit"
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
