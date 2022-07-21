import React from "react";
import authOk from "../images/auth-ok.svg";
import authError from "../images/auth-error.svg";

//todo сделать условие, прописать значение в auth, вставить ее вместь authOk
//todo сделать условие
//Что-то пошло не так!
// Попробуйте ещё раз.

//todo добавить onClick на кнопку "Закрыть"

function InfoTooltipPopup({ onClose }) {
  return (
    <section className="popup popup_is-opened">
      <div className="popup__infoTooltip">
        <button type="button" aria-label="закрыть" className="popup__button-close" onClick={onClose}></button>
        <div className="popup__infoTooltip-image" style = {{ backgroundImage: `url(${authOk})` }}></div>
        <p className="popup__infoTooltip-title">Вы успешно</p>
        <p className="popup__infoTooltip-title">зарегистрировались!</p>
      </div>
    </section>
  )
}

export default InfoTooltipPopup;
