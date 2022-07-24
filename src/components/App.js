import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
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
import RequireAuth from "./RequireAuth";
import InfoTooltipPopup from "./InfoTooltipPopup";
import * as Auth from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useNavigate();

  const auth = async (jwt) => {
    const content = await Auth.getContent(jwt)
      .then((res) => {
        if (res) {
          const { email } = res.data;
          setLoggedIn(true);
          setUserData({
            email
          })
        }
      })
    return content;
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history('/');
    }
  }, [loggedIn, history])

  const onLogin = ({ email, password }) => {
    return Auth.authorize(email, password)
      .then((res) => {
        if (res) {
          if (res.token) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
          }
        } else {
          throw new Error('Что-то пошло не так!');
        }
      })
      .then(() => {
        handleLoginSuccess();
      })
      .catch((err) => {
        handleLoginError();
        console.log(err.message);
      });
  }

  const handleLoginSuccess = () => {
    history('/');
  }

  const handleLoginError = () => {
    setIsInfoTooltipSuccess(false);
    setIsInfoTooltipPopupOpen(true);
  }

  const onRegister = ({ email, password }) => {
    return Auth.register(email, password)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return res;
        }
      })
      .then(() => {
        handleRegSuccess();
      })
      .catch((err) => {
        handleRegError();
        console.log(err.message);
      });
  }

  const handleRegSuccess = () => {
    setIsInfoTooltipSuccess(true);
    setIsInfoTooltipPopupOpen(true);
  }

  const handleRegError = () => {
    setIsInfoTooltipSuccess(false);
    setIsInfoTooltipPopupOpen(true);
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUser()
        .then((getUserRes) => {
          setCurrentUser(getUserRes)
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history('/sign-in');
    setLoggedIn(false);
  }

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
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  const closeInfoTooltipPopup = () => {
    setIsInfoTooltipPopupOpen(false);
    if (isInfoTooltipSuccess) {
      setTimeout(() => {
        history('/sign-in');
        setIsInfoTooltipSuccess(false);
      }, 400);
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(cards => setCards(cards))
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

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
    <div className="root">
      <Header email={userData.email} onClick={handleSignOut} />

      <Routes>
        <Route exact path="/sign-up" element={
          <Register onRegister={onRegister} />
        } />

        <Route exact path="/sign-in" element={
          <Login onLogin={onLogin} />
        } />

        <Route exact path="/" element={
          <RequireAuth loggedIn={loggedIn} redirectTo="/sign-in">
            <CurrentUserContext.Provider value={currentUser}>
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
            </CurrentUserContext.Provider>
          </RequireAuth>
        } />

        <Route path="*" element={
          <Navigate to={"/"} />
        } />
      </Routes>

      <InfoTooltipPopup isOpen={isInfoTooltipPopupOpen} success={isInfoTooltipSuccess} onClose={closeInfoTooltipPopup} />
    </div>
  );
}

export default App;
