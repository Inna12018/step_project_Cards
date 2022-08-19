import {Visit, Modal} from "./index.js";

class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.doctor = "Кардіолог";
    }

    createModal() {
        super.createModal();
        localStorage.removeItem("chosenDoctor");
        this.modal.addTitle("Кардіолог");
        this.modal.addInput( 'індекс маси тіла','кг/м2', false, "mass");
        this.modal.addInput( 'артеріальний тиск','мм рт. ст.', false, "pressure");
        this.modal.addInput('повних років', 'вік', false, "age");
        this.modal.addTextarea('modal-area form-control', "перенесені захворювання серцево-судинної системи", "illness");
    }

    gatherInfo() {
        super.gatherInfo();
        this.mass = document.getElementById("mass").value;
        this.pressure = document.getElementById("pressure").value;
        this.illness = document.getElementById("illness").value;
    }
}

export default VisitCardiologist;