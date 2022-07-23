import React from "react";
import authOk from "../images/auth-ok.svg";
import authError from "../images/auth-error.svg";

function InfoTooltipPopup({ isOpen, success, onClose }) {

  const classNamePopup = `popup ${isOpen && 'popup_is-opened'}`;

  const imageSrc = success ? authOk : authError;
  const titleRaw1 = success ? 'Вы успешно' : 'Что-то пошло не так!';
  const titleRaw2 = success ? 'зарегистрировались!' : 'Попробуйте ещё раз.';

  return (
    <section className={classNamePopup}>
      <div className="popup__infoTooltip">
        <button type="button" aria-label="закрыть" className="popup__button-close" onClick={onClose}></button>
        <div className="popup__infoTooltip-image" style = {{ backgroundImage: `url(${imageSrc})` }}></div>
        <p className="popup__infoTooltip-title">{titleRaw1}</p>
        <p className="popup__infoTooltip-title">{titleRaw2}</p>
      </div>
    </section>
  )
}

export default InfoTooltipPopup;
