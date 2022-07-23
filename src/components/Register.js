import Header from "./Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password })
      //todo показывать результат регистрации (InfoTooltipPopup)
      .then(() => history('/login'))
      // .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  }


  // handleChange(e) {
  //   const {name, value} = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  // handleSubmit(e){
  //   e.preventDefault()
  //   const { password, email } = ;
  //
  //   console.log(password);
  //   console.log(email);
  //
  //   Auth.register( password, email).then((res) => {
  //     if(res){
  //       this.setState({
  //         message: ''
  //       }, () => {
  //         this.props.history.push('/sign-in');
  //       })
  //     } else {
  //       this.setState({
  //         message: 'Что-то пошло не так!'
  //       })
  //     }
  //   });
  // }

  return (
    <div className="root">

      <Header />

      <section className="auth root__section">
        <form
          onSubmit={handleSubmit}
        >
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
        </form>

        <p className="auth__registered-text">
          Уже зарегистрированы? <a href="/login" className="auth__registered-text link">Войти</a>
        </p>

      </section>
    </div>
  );
}

export default Register;
