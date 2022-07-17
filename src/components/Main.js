import React from 'react';
import Card from '../components/Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile root__section profile_margin">
        <div className="profile__card">
          <div className="profile__avatar">
            <img alt="фото профиля" className="profile__photo" src={currentUser.avatar} />
            <button
              aria-label="обновить аватар"
              className="profile__edit-avatar"
              onClick={onEditAvatar}
            >
            </button>
          </div>
          <div className="profile__text">
            <div className="profile__name">
              <h1 className="profile__name-text">{currentUser.name}</h1>
              <button
                aria-label="редактировать"
                className="profile__edit-button"
                onClick={onEditProfile}
              >
              </button>
            </div>
            <p className="profile__job-text">{currentUser.about}</p>
          </div>
        </div>
        <button
          aria-label="добавить"
          className="profile__add-button"
          onClick={onAddPlace}
        >
        </button>
      </section>

      <section className="cards root__section cards_margin">
        <ul className="cards__items">
            {cards.map((card) => (
              <li key={card._id} className="cards__item">
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
