
class Form {
    constructor(classes) {
        this.form = document.createElement('form');
        this.form.className = classes;
    }

    addOnPage(parent) {
        parent.append(this.form);
    }
}

class Select {
    addDropdown(parent, args, dropName, id) {
        let dropdown = document.createElement('div');
        let dropdownOpen = document.createElement('button');
        let dropdownList = document.createElement('ul');

        dropdownOpen.className = 'btn btn-outline-primary dropdown-toggle';
        dropdownOpen.type = 'button';
        dropdownOpen.setAttribute('data-bs-toggle', 'dropdown');
        dropdownOpen.setAttribute('aria-expanded', 'false');
        dropdownOpen.textContent = dropName;
        dropdownList.className = 'dropdown-menu dropdown-menu-dark';
        dropdownList.setAttribute('aria-labelledby', 'dropdownMenuButton2');

        if (id) {
            dropdown.id = id;
        }

        args.forEach((i) => {
            let dropdownItem = document.createElement('li');
            dropdownItem.className = 'dropdown-item';
            dropdownItem.textContent = i;
            dropdownList.append(dropdownItem);

            dropdownItem.addEventListener('click', () => dropdownOpen.textContent = dropdownItem.textContent);
        });

        dropdown.append(dropdownOpen, dropdownList);
        parent.prepend(dropdown);
    }
}

class Textarea {
    addTextarea(parent, classes, placeholder, id, descValue) {
        let wrapper = document.createElement('div');
        let area = document.createElement('textarea');
        let description = document.createElement('span');

        area.className = classes;
        wrapper.className = 'modal-content-wrapper';

        if (placeholder) {
            area.placeholder = placeholder;
        }

        if (id) {
            area.id = id;
        }

        if (descValue) {
            description.textContent = descValue;
            description.className = 'modal-item-desc';
            wrapper.append(description);
        }

        wrapper.append(area);
        parent.append(wrapper);
    }
}

class Input {
    addInput(parent, placeholder, descValue, password = false, id) {
        let wrapper = document.createElement('div');
        let description = document.createElement('span');
        let input = document.createElement('input');

        input.placeholder = placeholder;
        input.className = 'form-control form-input';

        if (password === true) {
            input.type = 'password';
        }

        if (placeholder) {
            input.placeholder = placeholder;
        }

        if (id) {
            input.id = id;
        }

        wrapper.className = 'modal-content-wrapper';
        description.className = 'modal-item-desc';
        description.textContent = descValue;

        wrapper.prepend(description, input);
        parent.append(wrapper);
    }
}



export {Form, Select, Textarea, Input};