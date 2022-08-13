class Modal {
<<<<<<< Updated upstream
    constructor(modalClass) {
      this.modal = document.querySelector('.modalClass');
    }
    showModal(){
      this.modal.classList.remove('modal');
    }
    hideModal() {
      this.modal.classList.add('modal');
    }
=======
  constructor(modalClass) {
    this.modal = document.querySelector(modalClass); //тут залишиться без коми та нормально майже працює 
>>>>>>> Stashed changes
  }
  showModal(){
    this.modal.classList.remove('modal');
  }
  hideModal() {
    this.modal.classList.add('modal');
  }
}

export default Modal;