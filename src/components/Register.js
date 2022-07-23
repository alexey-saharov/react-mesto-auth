import Header from "./Header";
import React from "react";
import * as Auth from "../utils/Auth";
import WithRouter from "./WithRouter";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault()
    const { password, email } = this.state;

    console.log(password);
    console.log(email);

    Auth.register( password, email).then((res) => {
      if(res){
        this.setState({
          message: ''
        }, () => {
          this.props.history.push('/sign-in');
        })
      } else {
        this.setState({
          message: 'Что-то пошло не так!'
        })
      }
    });
  }

  render() {
    return (
      <div className="root">

        <Header/>
        <section className="auth root__section">
          <form
            onSubmit={this.handleSubmit}
          >

            <h1 className="auth__title">Регистрация</h1>
            <input
              type="email"
              id="email"
              name="email"
              className="auth__input"
              required
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              type="password"
              id="password"
              name="password"
              className="auth__input auth__input_margin"
              required
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleChange}
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
}

//todo Шапка для авторизованного и неавторизованного пользователя должна отличаться.

export default WithRouter(Register);
