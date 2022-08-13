<<<<<<< Updated upstream
import AutoModal from './Autorization.js';
import sendRequest from "./request/sendRequest.js";
import CreateCardModal from './visit/CreateVisit.js';


const btnAuth = document.querySelector('.btn-auth');
const btnCreate = document.querySelector('.btn-create');
const token = 'ecc480aa-5b7b-4842-ba64-8a77d77293af';
=======
import AutorizationModal from "./Autorization.js";
const btnAunt = document.querySelector(".btn-auntification");
const btnCreateCard = document.querySelector(".btn__create-card");
>>>>>>> Stashed changes

const modalAvtorization = new AutorizationModal(".modal-authorization");

btnAunt.addEventListener("click", () => {
  modalAvtorization.showModalAvtorization();
});

//потрібно для створення картки

btnCreateCard.addEventListener("click", () => {
  const modalCreateCard = new CreateCardModal(
    modalAutorization.getToken(),
    ".modal-create-card "
  );
  modalCreateCard.showModalCreateCard();
});