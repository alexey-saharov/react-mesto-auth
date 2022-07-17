import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {api} from '../utils/Api.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getUser()
      .then((getUserRes) => {
        setCurrentUser(getUserRes)
      })
      .catch(err => console.log(err));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = ({ name, about }) => {
    api.setUserInfo({ name, about })
      .then(getUserRes => {
        setCurrentUser(getUserRes);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then(getUserRes => {
        setCurrentUser(getUserRes);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => console.log(err));
  }, []);

  function handleCardDelete(card) {
    api.deleteCard({ _id: card._id })
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  return (
    <Routes>
      <Route exact path="/" element={
        <CurrentUserContext.Provider value={currentUser}>
          <div className="root">

            <Header />

            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />

            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace ={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          </div>
        </CurrentUserContext.Provider>
      } />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
}

export default App;
