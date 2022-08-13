class Modal {
  constructor(modalClass) {
    this.modal = document.querySelector(modalClass); //тут залишиться без коми та нормально майже працює 
  }
  showModal(){
    this.modal.classList.remove('modal');
  }
  hideModal() {
    this.modal.classList.add('modal');
  }
}

export default Modal;