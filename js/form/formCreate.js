import {validateDesc,validateAge,validateWeight,} from "../modal/validate.js";
import sendRequest from "../request/sendRequest.js";
import Modal from "../modal/modal.js";

class CreateCardModal extends Modal {
  constructor(token, modal) {
    super(modal), (this.token = token);
  }
  showModalCreateCard() {
    this.showModal();
    const selectDoctor = this.modal.querySelector(".select-doc");
    const optionForm = this.modal.querySelector(".modal-option");
    selectDoctor.addEventListener("change", () => {
      optionForm.innerText = "";
      switch (selectDoctor.value) {
        
        case "Therapist":
          optionForm.insertAdjacentHTML("afterbegin", `
            <div class="input-group mb-3">
                <span class="input-group-text">Вік</span>
                <input type="text"  class="form-control visit-client__old">
            </div>
            `
          );
          break;
        case "Dentist":
          optionForm.insertAdjacentHTML("afterbegin",`
            <div class="input-group mb-3">
                <span class="input-group-text">Дата останнього візиту</span>
                <input type="date"  class="form-control visit-date">
            </div>
            `
          );
          break;
          case "Cardiologist":
          optionForm.insertAdjacentHTML("afterbegin",` 
            <div class="input-group mb-3">
              <span class="input-group-text">Звичайний тиск</span>
              <input type="text"  class="form-control visit-presure">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Індекс маси тіла</span>
              <input type="text"  class="form-control visit-weight">
            </div>
            <div class="input-group mb-3">
              <textarea class="form-control visit-diseases" placeholder="Перенесені захворювання серцево-судинної системи" id="textareaСardiologistCard" style="height: 100px"></textarea>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Вік</span>
              <input type="text"  class="form-control visit-client__old">
            </div>
            `
          );
          break;
      }
    });
    const btnSendRequest = this.modal.querySelector(".btn-entry"); 
    btnSendRequest.addEventListener("click", (e) => {
      e.preventDefault();
      const visitTitleInput = this.modal.querySelector(".visit-title");
      const visitDesc = this.modal.querySelector("#textareaCreateCard").value;
      const visitPriority = this.modal.querySelector(".visit-priority").value;
      const visitFullNameInput = this.modal.querySelector(".visit-client__name");
      let body = {
        title: visitTitleInput.value,
        description: visitDesc,
        priority: visitPriority,
        fullName: visitFullNameInput.value,
        doctor: selectDoctor.value,
      };
      switch (body.doctor) {
        case "Therapist":
          const visitOldInput = this.modal.querySelector(".visit-client__old");
          body.age = visitOldInput.value;
          break;
        case "Dentist":
          const visitLastDate = this.modal.querySelector(".visit-date").value;
          body.lastVisit = visitLastDate;
          break;
        case "Cardiologist":
          const visitNormalPresure =
            this.modal.querySelector(".visit-presure").value;
          const visitWeight = this.modal.querySelector(".visit-weight").value;
          const visitDiseases =
            this.modal.querySelector(".visit-diseases").value;
          const visitAge = this.modal.querySelector(".visit-client__old").value;
          body.age = visitAge;
          body.diseases = visitDiseases;
          body.weight = visitWeight;
          body.presure = visitNormalPresure;
          break;
      }
      if (validateDesc(visitTitleInput) && validateDesc(visitFullNameInput)) {
        switch (body.doctor) {
          case "Therapist":
            const visitOldInput =
              this.modal.querySelector(".visit-client__old");
            if (validateAge(visitOldInput)) {
              this.postCard(body);
            }
            break;
          case "Dentist":
            const visitLastDateInput = this.modal.querySelector(".visit-date");
            if (validateDesc(visitLastDateInput)) {
              this.postCard(body);
            }
            break;
          case "Cardiologist":
            const visitNormalPresureInput =
              this.modal.querySelector(".visit-presure");
            const visitWeightInput = this.modal.querySelector(".visit-weight");
            const visitDiseasesInput =
              this.modal.querySelector(".visit-diseases");
            const visitAgeInput =
              this.modal.querySelector(".visit-client__old");
            if (
              validateAge(visitAgeInput) && validateDesc(visitDiseasesInput) && validateDesc(visitNormalPresureInput) && validateWeight(visitWeightInput)
            ) {
              this.postCard(body);
            }
            break;
        }
      }
    });

    function closeEvent(event) {
      if (
        event.target.classList.contains("modal-close") ||
        (!event.target.classList.contains("header-button") && !event.target.closest(".modal-create-card"))
      ) {
        document.removeEventListener("click", closeEvent);
        document.querySelector(".modal-create-card").classList.add("modal");
      }
    }
    document.addEventListener("click", closeEvent);
  }
  postCard(card) {
    sendRequest("https://ajax.test-danit.com/api/v2/cards", "POST", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(card),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        this.hideModal();
      })
      .catch((error) => console.error(error.message));
  }
}

export default CreateCardModal;
