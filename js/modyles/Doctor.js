//Класс доктора, используемый для создания раскрывающегося списка <select> с 3 вариантами врачей (кардиолог, стоматолог, терапевт)

//.doctor-form-container (добавить этот класс в визите, чтоб я могла его использовать)
let doctorFormContainer = document.createElement('div');
doctorFormContainer.classList.add('doctor-form-container');



export default class Doctor {
	constructor(value) {
		let dropDownSettings = {
			"type": "select",
			"id": "doctor",
			"class": "doctor-select",
			"name":"doctor",
			"options": [{
				"text":"- Please select a doctor -",
				"value":""
			},
			{
				"text":"Cardiologist",
				"value":"cardiologist"
			},{
				"text":"Dentist",
				"value":"dentist"
			},
			{
				"text":"Therapist",
				"value":"therapist"
			}]
		};

		if(value){
			dropDownSettings.value = value;
		}

		let selectDoctorFieldObject = new Field(dropDownSettings);
		let createVisit = selectDoctorFieldObject.field;
	
		createVisit.addEventListener("change", (e)=>{
			e.preventDefault();
			let value = e.target.value;
			let doctorFormContainer = document.querySelector('.doctor-form-container');

			if (value){
				let form = new Form(value);
				doctorFormContainer.innerHTML = '';
				doctorFormContainer.appendChild(form);
			} else {
				doctorFormContainer.innerHTML = '';
			}
		});

		return createVisit;
	}
}