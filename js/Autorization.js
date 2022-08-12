import sendRequest from './request/sendRequest.js';
import Modal from './modal/modal.js';

class AutoModal extends Modal{
    constructor(modal) {
      super(modal),
      this.token = null
    }
    showAutoModal() {
      this.showModal();
      const btnSendRequest = document.querySelector('.btn-entry');
      btnSendRequest.addEventListener('click', () => {
        this.changeNavButton();
        //need Validation!!!!
      const emailValue = document.querySelector('.input-email').value;
      const passwordValue = document.querySelector('.input-password').value;
      this.sendAuntificationData(emailValue, passwordValue);
    })
      function closeEvent(event) {
        if (event.target.classList.contains('modal-close') || !event.target.classList.contains('btn-header') && !event.target.closest(".auth-modal")) {
          document.removeEventListener('click', closeEvent);
          document.querySelector('.auth-modal').classList.add("modal");
        }
      }
      document.addEventListener('click', closeEvent);
    }
    sendAuntificationData(email, password) {
      const body = {
        email: email,
        password: password
      };
      const token = sendRequest("http://ajax.test-danit.com/api/v2/cards/login", 'POST', {
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
      document.querySelector('.btn-auth').classList.remove('visually-hidden');
      document.querySelector('.btn-create').classList.add('visually-hidden');
    }
    getToken() {
      return this.token;
    }
  }
  
  export default AutoModal;
