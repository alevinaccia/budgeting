const container = document.querySelector('.container');

window.onload = () => {
    getOptions('1234'); //TODO creator id hard coded
}

const createList = (list) => {
    const arr = Array.from(list);
    arr.forEach((option) => {
        addElementToList(option)
    })
}

const addElementToList = (option) => {
    const budget = document.createElement('div');
    budget.setAttribute('class', 'budget');
    const main = document.createElement('div');
    main.setAttribute('class', 'main');
    const icons = document.createElement('div');
    icons.setAttribute('class', 'icons');
    const i = document.createElement('i');
    i.setAttribute('class', 'fas fa-trash');
    i.setAttribute('id', option._id);
    icons.append(i);
    const upper = document.createElement('div');
    const bottom = document.createElement('div');
    upper.setAttribute('class', 'upper');
    bottom.setAttribute('class', 'bottom');
    const name = document.createElement('span');
    name.innerText = option.name;
    const inputContainer = document.createElement('span');
    const input = document.createElement('input');
    inputContainer.setAttribute('class', 'test');
    input.setAttribute('type', 'number');
    input.setAttribute('class', 'valueInput');
    input.setAttribute('value', option.value);
    input.style.background = 'transparent';
    const colorContainer = document.createElement('span');
    const colorInput = document.createElement('input');
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('class', 'colorInput');
    colorInput.value = option.color
    const progress = document.createElement('progress');
    progress.max = option.value;
    progress.value = 0;

    //Listners

    i.addEventListener('click', async () => {
        let res = await remove(option._id);
        if (res) {
            document.getElementById(`${option._id}`).remove();
        }
    })

    colorInput.addEventListener('input', () => {
        budget.style.background = colorInput.value;
        if(checkBrightness(colorInput.value) < 50){
            budget.style.color = 'white';
        }else{
            budget.style.color = 'black';
        }      
    });

    colorInput.addEventListener('focusout', async () => {
        await update(budget.id , colorInput.value);      //TODO hardcoded creatorid
        //TODO call this once the pace is offloaded, and change all options changed.
    });


    inputContainer.appendChild(input);
    colorContainer.appendChild(colorInput);
    inputContainer.innerHTML += "€";

    upper.appendChild(name);
    upper.appendChild(inputContainer);
    upper.appendChild(colorContainer);
    bottom.appendChild(progress);

    main.appendChild(upper);
    main.appendChild(bottom);

    budget.appendChild(main);
    budget.appendChild(icons);

    budget.style.background = option.color;
    budget.setAttribute('id', option._id);

    container.appendChild(budget);
}

const checkBrightness = (color) => {
    let c = color.substring(1);
    let rgb = parseInt(c, 16);
    let r = (rgb >> 16) & 0xff;  
    let g = (rgb >> 8) & 0xff;  
    let b = (rgb >> 0) & 0xff;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};