import sendRequest from './request/sendRequest.js';
import {validateEmail,validatePassword} from './modal/validate.js'
import Modal from './modal/modal.js';

class AutorizationModal extends Modal{
  constructor(modal) {
    super(modal),
    this.token = null //тут залишиться без коми та нормально майже працює 
  }
  showModalAuto() {
    this.showModal();
    const btnSendRequest = document.querySelector('.btn-entry');
    btnSendRequest.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('.input-email');
      const passwordInput = document.querySelector('.input-password');
      if(validateEmail(emailInput)&&validatePassword(passwordInput)){
        this.sendAuntificationData(emailInput.value, passwordInput.value);
      }
    })
    function closeEvent(event) {
      if (event.target.classList.contains('modal-close') || !event.target.classList.contains('header-button') && !event.target.closest(".modal-authorization")) {
        document.removeEventListener('click', closeEvent);
        document.querySelector('.modal-authorization').classList.add("modal");
      }
    }
    document.addEventListener('click', closeEvent);
  }
  sendAuntificationData(email, password) {
    const body = {
      email: email,
      password: password
    };
    const token = sendRequest("https://ajax.test-danit.com/api/v2/cards/login", 'POST', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.text())
      .then(token => {
        this.token = token;
        this.changeNavButton();
        this.hideModal();
      })
      .catch(error => console.error(error.message));
  }
  changeNavButton() {
    document.querySelector('.btn-auntification').classList.add('visually-hidden');
    document.querySelector('.btn__create-card').classList.remove('visually-hidden');
  }
  getToken() {
    return this.token;
  }
}

export default AutorizationModal;