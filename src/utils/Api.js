class Api {
  _url;
  _headers;

  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/users/me`,{
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  setUserInfo(UserInfo) {
    return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(UserInfo),
    })
      .then(this._handleResponse)
  }

  setUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userAvatar),
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`,{
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  addCard(card) {
    return fetch(`${this._url}/cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card),
    })
      .then(this._handleResponse)
  }

  deleteCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  likeCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}/likes`,{
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  dislikeCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}/likes`,{
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(id, targetLikeStatus) {
    if (targetLikeStatus) {
      return this.likeCard({ _id: id});
    } else {
      return this.dislikeCard({ _id: id});
    }
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '29779b63-56c9-48f1-bf2c-946b66c63b59',
    'Content-Type': 'application/json'
  }
});
