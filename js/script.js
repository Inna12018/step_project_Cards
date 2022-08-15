import AutorizationModal from "./Autorization.js";
import CreateCardModal from "./form/formCreate.js";
const btnAunt = document.querySelector(".btn-auntification");
const btnCardCreate = document.querySelector(".btn__create-card");

const modalAuto = new AutorizationModal(".modal-authorization");

btnAunt.addEventListener("click", () => {
  modalAuto.showModalAuto();
});

btnCardCreate.addEventListener("click", () => {
  const modalCreateCard = new CreateCardModal(
    modalAuto.getToken(),
    ".modal-create-card"
  );
  modalCreateCard.showModalCreateCard();
});