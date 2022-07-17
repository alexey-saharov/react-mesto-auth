import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      name="profile"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="fullname"
        name="fullname"
        className="popup__input popup__input_fullname"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        value={name}
        onChange={handleChangeName}
      />
      <span id="fullname-error" className="popup__error"></span>
      <input
        type="text"
        id="job"
        name="job"
        className="popup__input popup__input_job"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        value={description}
        onChange={handleChangeDescription}
      />
      <span id="job-error" className="popup__error popup__error_margin"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
