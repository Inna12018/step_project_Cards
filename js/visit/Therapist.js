import {Visit, Modal} from "./index.js";

class VisitTherapist extends Visit {
    constructor() {
        super();
        this.doctor = "Терапевт";
    }

    createModal() {
        super.createModal();
        localStorage.removeItem("chosenDoctor");
        this.modal.addTitle("Терапевт");
        this.modal.addInput('полных лет', 'вік', false, "age");
    }
}

export default VisitTherapist;