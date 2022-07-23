import React, {useState} from "react";

function Login({ onLogin, onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({email, password})
      .then(() => {
        onSuccess();
      })
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        onError();
        console.log(err.message);
      });
  }

  return (
    <section className="auth root__section">
      <form  className="auth__form" onSubmit={handleSubmit}>
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
        <button type="submit" className="auth__button-submit" aria-label="Войти">Войти</button>
      </form>
    </section>
  );
}

export default Login;
