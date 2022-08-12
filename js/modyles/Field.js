//Класс FormField для создания входных данных/выбора/текстовой области HTML 



export default class FormField {
	constructor(fieldObject, formClass) {
	
		this.id = fieldObject.id;
		this.class = fieldObject.class || `${formClass}__${fieldObject.id}`;
		this.label = fieldObject.label;
		this.type = fieldObject.type;
		this.name = fieldObject.name;
		this.options = fieldObject.options;
		this.value = fieldObject.value || '';
		this.required =fieldObject.required ;

		this.field = this.getField();
		this.label = this._getLabel();
	}

	getField(){
		let element;
		if(this.type == 'textArea'){
			element = this._getTextArea();
		}

		if(this.type == 'select'){
			element = this._getDropDown();
		}

		if(!element){
			element = this._getInputField();
		}

		return element;
	}

    // Создадим <label>
	_getLabel(){
		let label;

		if (this.label){
			label = document.createElement('label');
			label.classList.add("label-input");
			label.innerText = `${this.label}: `;
		}

		return label;
	}

	// Создадим <input> 
	_getInputField(){
		let inputField = document.createElement('input');
		inputField.setAttribute('id', this.id);
		inputField.setAttribute('class', this.class);
		inputField.setAttribute('type', this.type);
		inputField.setAttribute('name', this.name);
		inputField.setAttribute('required', this.required);
		if(this.value){
			inputField.setAttribute('value', this.value);
		}

		return inputField;
	}

	// Создадим  <textarea> 
	_getTextArea(){
		let textArea = document.createElement('textarea');
		textArea.setAttribute('id', this.id);
		textArea.setAttribute('class', this.class);
		textArea.setAttribute('name', this.name);
		if(this.value){
			textArea.innerText = this.value;
		}

		return textArea;
	}

	// Создадим DropDown <select><options></options></select> DOM element
	_getDropDown(){
		let dropDown = document.createElement('select');
		dropDown.setAttribute('id', this.id);
		dropDown.setAttribute('class', this.class);
		dropDown.setAttribute('name', this.name);

		for (let i = 0; i < this.options.length; i++){
			let option = this.options[i];
			let optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.text = option.text;
			dropDown.appendChild(optionElement);
		}

		if(this.value){
			dropDown.value = this.value;
		}

		return dropDown;
	}
}