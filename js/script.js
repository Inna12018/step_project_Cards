import AutorizationModal from "./Autorization.js";
const btnAunt = document.querySelector(".btn-auntification");
const btnCreateCard = document.querySelector(".btn__create-card");

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