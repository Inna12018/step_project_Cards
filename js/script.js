<<<<<<< HEAD
// import AutoModal from './Autorization.js';
// import sendRequest from "./request/sendRequest.js";
// import CreateCardModal from './visit/CreateVisit.js';

// import{doctor, field} from './modyles/index.js';
=======
import AutorizationModal from "./Autorization.js";
import CreateCardModal from "./form/formCreate.js";
const btnAunt = document.querySelector(".btn-auntification");
const btnCardCreate = document.querySelector(".btn__create-card");
>>>>>>> 086cf7fd4e51091ba20da5579b7134e229a14e88

const modalAuto = new AutorizationModal(".modal-authorization");

<<<<<<< HEAD


// const btnAuth = document.querySelector('.btn-auth');
// const btnCreate = document.querySelector('.btn-create');
// const token = 'ecc480aa-5b7b-4842-ba64-8a77d77293af';

// const modalAuto = new AutoModal('.auth-modal');

// btnAuth.addEventListener('click',()=>{
//     modalAuto.showAutoModal();
// });

// btnCreate.addEventListener('click',()=>{
//     const modalCreateCard = new CreateCardModal(modalAuto.getToken(),'.modal-create-card');
//     modalCreateCard.showModalCreateCard();
// });

// // Функція для отримання карток з серверу(для тестування)

// const showAllCards = sendRequest("https://ajax.test-danit.com/api/v2/cards", 'GET', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//     })
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => console.error(error.message));


      import VisitCardiologist from "./Visit/Cardiologist.js";
      import VisitDentist from "./Visit/Dentist.js";
      import VisitTherapist from "./Visit/Therapist.js";
      import { Visit } from "./Visit/index.js";
      import Authorization from "./Autorization.js";
      // import API from "./ajax/API.js";
      
      let authorization = new Authorization();
      let general = new Visit();
      
      document.addEventListener("load", authorization.checkLogin());
      general.transformCards().then((cards) => {
        general.render(cards);
        document.getElementById("find").oninput = (e) => {
          general.render(general.search(cards, e.target.value));
        };
      });
      
      const searchForm = document.querySelector("#submitSearch");
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = document.querySelector(".chooseStatus");
        const urgency = document.querySelector(".chooseUrgency");
        API.getCards().then((data) => {
          const filteredData = data.filter((card) => {
            if (
              (card.status.toLowerCase() == status.value.toLowerCase() &&
                card.urgency.toLowerCase() == urgency.value.toLowerCase()) ||
              (status.value == "Все" &&
                card.urgency.toLowerCase() == urgency.value.toLowerCase()) ||
              (urgency.value == "Все" &&
                card.status.toLowerCase() == status.value.toLowerCase()) ||
              (status.value == "Все" && urgency.value == "Все")
            ) {
              return card;
            }
          });
          console.log(filteredData);
          general.render(filteredData);
        });
      });
      
      let repeater;
      
      function cardsCheck() {
        if (document.querySelector(".card")) {
          document.querySelector(".nothing").style.display = "none";
        } else {
          document.querySelector(".nothing").style.display = "block";
        }
        repeater = setTimeout(cardsCheck, 100);
      }
      
      if (document.getElementById("logIn")) {
        let logInBtn = document.getElementById("logIn");
        logInBtn.addEventListener("click", () => {
          authorization.openModal();
        });
      }
      
      if (document.getElementById("addCard")) {
        if (document.querySelector(".card-body")) {
          document.querySelector(".nothing").remove();
        }
      
        let createCard = document.getElementById("addCard");
        createCard.addEventListener("click", () => {
          general.chooseDoctor();
      
          const chooseDoc = document.getElementById("chooseDoc");
      
          let Dentist = new VisitDentist();
          let Cardiologist = new VisitCardiologist();
          let Therapist = new VisitTherapist();
      
          const choseVisit = () => {
            if (localStorage.getItem("chosenDoctor") === "Кардиолог") {
              localStorage.removeItem("chosenDoctor");
              Cardiologist.createModal();
            } else if (localStorage.getItem("chosenDoctor") === "Стоматолог") {
              localStorage.removeItem("chosenDoctor");
              Dentist.createModal();
            } else if (localStorage.getItem("chosenDoctor") === "Терапевт") {
              localStorage.removeItem("chosenDoctor");
              Therapist.createModal();
            }
          };
      
          function validation(visitInfo) {
            let allInputs = [
              ...document.querySelectorAll(".dropdown-toggle"),
              ...document.querySelectorAll(".form-control"),
            ];
            allInputs.forEach((input) => {
              if (
                input.value === "" ||
                input.textContent === "срочность" ||
                input.textContent === "статус визита"
              ) {
                input.classList.toggle("input-error");
              }
            });
            for (const [key, value] of Object.entries(visitInfo)) {
              if (
                value === "" ||
                value === "срочность" ||
                value === "статус визита"
              ) {
                throw new Error("Не все поля заполнены");
              }
            }
          }
      
          chooseDoc.addEventListener("click", () => {
            choseVisit();
      
            let submit = document.getElementById("createCard");
            let modalTitle = document.querySelector(".modal-title");
      
            submit.addEventListener("click", async () => {
              let errorInputs = document.querySelectorAll(".input-error");
              errorInputs.forEach((input) => {
                input.classList.remove("input-error");
              });
      
              try {
                if (modalTitle.textContent === "Кардиолог") {
                  Cardiologist.gatherInfo();
                  validation(Cardiologist);
                  Cardiologist.sendCard();
                  Cardiologist.closeModal();
                } else if (modalTitle.textContent === "Стоматолог") {
                  Dentist.gatherInfo();
                  validation(Dentist);
                  Dentist.sendCard();
                  Dentist.closeModal();
                } else {
                  Therapist.gatherInfo();
                  validation(Therapist);
                  Therapist.sendCard();
                  Therapist.closeModal();
                }
      
                let allCards = await API.getCards();
                general.createOnPage(allCards);
              } catch (err) {
                alert(err.message);
              }
            });
          });
        });
      }
      
      cardsCheck();   
=======
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
>>>>>>> 086cf7fd4e51091ba20da5579b7134e229a14e88
