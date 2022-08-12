import AutoModal from './Autorization.js';
import sendRequest from "./request/sendRequest.js";
import CreateCardModal from './visit/CreateVisit.js';
const btnAuth = document.querySelector('.btn-auth');
const btnCreate = document.querySelector('.btn-create');
const token = 'ecc480aa-5b7b-4842-ba64-8a77d77293af';

const modalAuto = new AutoModal('.auth-modal');

btnAuth.addEventListener('click',()=>{
    modalAuto.showAutoModal();
});

btnCreate.addEventListener('click',()=>{
    const modalCreateCard = new CreateCardModal(modalAuto.getToken(),'.modal-create-card');
    modalCreateCard.showModalCreateCard();
});

// Функція для отримання карток з серверу(для тестування)

const showAllCards = sendRequest("https://ajax.test-danit.com/api/v2/cards", 'GET', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error.message));

