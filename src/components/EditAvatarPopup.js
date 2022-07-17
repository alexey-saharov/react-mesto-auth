import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      name="avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="link_avatar"
        name="link_avatar"
        className="popup__input popup__input_avatarlink"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span id="link_avatar-error" className="popup__error popup__error_margin"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
