import Modal from "../modals/Modal.js";
import API from "../ajax/API.js";

class Visit {
    constructor() {
        this.modal = new Modal();
    }

    chooseDoctor() {
        const doctorsVariety = new Modal();
        doctorsVariety.show("Обрати", "chooseDoc");
        doctorsVariety.addTitle("Обрати лікаря");
        doctorsVariety.addDropdown(['Кардіолог', 'Стоматолог', 'Терапевт'], 'Лікар', "doctors");
        const chosenDoctor = document.getElementById("doctors");
        document.getElementById("chooseDoc").addEventListener("click", () => {
            if (chosenDoctor.innerText === "Лікар") {
                alert("Оберіть лікаря, будь лвска!");
            } else {
                localStorage.setItem("chosenDoctor", doctors.innerText);
                doctorsVariety.remove();
            }
        });
    }

    createModal() {
        this.modal.show('Створити', "createCard");
        this.modal.addDropdown(['звичайна', 'пріоритетна', 'невідкладна'], 'терміновість візиту', "urgency");
        this.modal.addDropdown(['відкритий', 'завершено'], "статус візиту", "status");
        this.modal.addInput('П.І.Б.', 'Прізвище, Ім\'я, по Батькові', false, "fullName");
        this.modal.addTextarea("modal-area form-control", "мета візиту", "motive");
        this.modal.addTextarea("modal-area form-control", "опис візиту", "description");

    }

    gatherInfo() {
        delete this.modal;
        this.urgency = document.getElementById("urgency").innerText;
        this.status = document.getElementById("status").innerText;
        this.fullName = document.getElementById("fullName").value;
        this.motive = document.getElementById("motive").value;
        this.description = document.getElementById("description").value;
    }

    closeModal() {
        document.querySelector(".modal").remove();
    }

    sendCard() {
        API.addCard(this);
    }

    createOnPage(array) {
        document.querySelectorAll('.card').forEach(card => {
            card.remove();
        });
        array.forEach(item => {
            const cardWrapper = document.createElement("div");
            const card = document.createElement("div");
            const doctors = document.createElement("h5");
            const fullName = document.createElement("h6");
            const urgency = document.createElement("p");
            const status = document.createElement("p");
            const showMore = document.createElement("a");
            const icons = document.createElement("div");
            const deleteCard = document.createElement("img");
            const editCard = document.createElement("img");

            cardWrapper.className = "card d-inline-flex";
            cardWrapper.id = item.id;
            card.classList.add("card-body");
            doctors.classList.add("card-title");
            icons.classList.add("d-flex");
            deleteCard.className = "card-title icons";
            deleteCard.src = 'img/delete.svg';
            editCard.className = "card-title icons";
            editCard.src = 'img/edit.svg';
            showMore.textContent = "Показати більше / менше";
            showMore.className = "card-subtitle mb-2 fst-italic text-muted pe-auto";
            showMore.href = "";
            showMore.id = item.id;
            fullName.className = "card-subtitle mb-2 text-muted";
            urgency.classList.add("card-text");
            status.classList.add("card-text");

            doctors.textContent = item.doctor;
            fullName.textContent = item.fullName;
            urgency.textContent = item.urgency;
            status.textContent = item.status;

            deleteCard.addEventListener("click", () => {
                const confirmDel = confirm('Ви впевнені?');
                if (confirmDel) {
                    API.deleteCard(item);
                    document.getElementById(item.id).remove();
                }
            });

            editCard.addEventListener("click", () => {
                let changeInfo = new Modal();
                changeInfo.show("Зберегти", "saveCard");
                changeInfo.addTitle("Редагувати");
                for (const [key, value] of Object.entries(item)) {
                    switch (key) {
                        case "status":
                            changeInfo.addDropdown(['відкритий', 'завершено'], "статус візиту", "status");
                            break;
                        case "urgency":
                            changeInfo.addDropdown(['звичайна', 'пріоритетна', 'невідкладна'], 'терміновість візиту', "urgency");
                            break;
                        case "fullName":
                            changeInfo.addInput('Прізвище, Ім\'я, По батькові', 'Прізвище,  Ім\'я, По батькові', false, "fullName");
                            break;
                        case "motive":
                            changeInfo.addTextarea("modal-area form-control", "мета візиту", "motive");
                            break;
                        case "description":
                            changeInfo.addTextarea("modal-area form-control", "опис візиту", "description");
                            break;
                        case "mass":
                            changeInfo.addInput('кг/м2', 'індекс маси тіла', false, "mass");
                            break;
                        case "pressure":
                            changeInfo.addInput('мм рт. ст.', 'артеріальний тиск', false, "pressure");
                            break;
                        case "age":
                            changeInfo.addInput('повних років', 'вік', false, "age");
                            break;
                        case "illness":
                            changeInfo.addTextarea('modal-area form-control', "перенесені захворювання серцево-судинної системи", "illness");
                            break;
                        case "date":
                            changeInfo.addInput('дд-мм-гггг', 'дата останнього відвідування', false, "date");
                            break;
                    }
                }
                document.getElementById("saveCard").addEventListener("click", () => {

                    let status = document.getElementById('status').getElementsByClassName('btn-primary ')[0].innerHTML;
                    let listOfUrgencyElements = document.getElementById("urgency");

                    let allInputs = [listOfUrgencyElements, ...document.querySelectorAll(".form-control")];
                    let newData = {
                        id: item.id,
                        doctor: item.doctor,
                        status: status
                    };

                    allInputs.forEach(input => {
                        for (const [key, value] of Object.entries(item)) {
                            if (input && input.id === key) {
                                newData[`${input.id}`] = input.value;
                                if (input.innerText) {
                                    newData[`${input.id}`] = input.firstChild.innerHTML;
                                }
                            }
                        }
                    });
                    document.getElementById(`${newData.id}`).remove();
                    API.editCard(newData);
                    changeInfo.remove();
                    location.reload();
                });
            });

            if (status.textContent === 'відкритий') {
                status.style.color = 'Green';
            }
            if (status.textContent === 'завершено') {
                status.style.textDecoration = 'line-through';
                status.style.color = 'Red';
            }
            if (urgency.textContent === 'звичайна') {
                urgency.style.color = 'lightseagreen';
            }
            if (urgency.textContent === 'пріоритетна') {
                urgency.style.color = 'Orange';
            }
            if (urgency.textContent === 'невідкладна') {
                urgency.style.color = 'Red';
            }

            let additionalInfo = document.createElement("ul");
            additionalInfo.id = item.id;
            additionalInfo.className = "list-group d-none";
            for (const [key, value] of Object.entries(item)) {
                if (key !== "id" && key !== "doctor" && key !== "urgency" && key !== "status" && key !== "fullName") {
                    additionalInfo.insertAdjacentHTML("afterbegin", `<li class="list-group-item">${key}: ${value}</li>`);
                }
            }
            card.append(additionalInfo);

            showMore.addEventListener("click", e => {
                e.preventDefault();
                document.querySelectorAll(".list-group").forEach(list => {
                    if (list.id === showMore.id) {
                        list.classList.toggle("d-none");
                    }
                });
            });

            icons.append(deleteCard, editCard);
            card.prepend(icons, doctors, fullName, urgency, status, showMore);
            cardWrapper.prepend(card);
            document.body.append(cardWrapper);
        });
    }

    search(array, value) {
        if (value) {
            const newArray = array.filter(item => {
                if (item.doctor.toLowerCase().indexOf(value.toLowerCase()) >= 0 || item.motive.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    return item;
                }
            });
            return newArray;
        } else {
            return array;
        }
    }

    transformCards() {
        return API.getAllCards();
    }

    render(info) {
        document.querySelectorAll('.card').forEach(card => {
            card.remove();
        });
        return this.createOnPage(info);
    }
}

export {
    Visit,
    Modal
};