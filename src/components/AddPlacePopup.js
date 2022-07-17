import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      name="card-add"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="placename"
        name="name"
        className="popup__input popup__input_placename"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
      />
      <span id="placename-error" className="popup__error"></span>
      <input
        type="url"
        id="link"
        name="link"
        className="popup__input popup__input_placelink"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
      />
      <span id="link-error" className="popup__error popup__error_margin"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
