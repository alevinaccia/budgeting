import Request from "../modules/reqManager.js";
const request = new Request;
const container = document.querySelector('.container');
const showAllCheck = document.querySelector('.showAllCheckbox');
const nameSortBTN = document.querySelector('.nameSortBTN');
const fillSortBTN = document.querySelector('.fillSortBTN');

export default class budgetContainerController {
    constructor() {
        this.currentCategoriesShown = [];
        this.addListners();
    }

    createList(list = this.currentCategoriesShown, param = cat => cat) {
        this.currentCategoriesShown = list.filter(param);
        this.currentCategoriesShown.forEach((category) => {
            this.addElementToList(category)
        })
    }

    addElementToList(category) {
        if(category.budget)
            this.generateBudgetView(category);
        else
            this.generateNonBudgetView(category);
        
    }

    addListners() {
        showAllCheck.addEventListener('input', async () => {
            container.innerHTML = '';
            const allCategories = Array.from(await request.getAllCategories());
            showAllCheck.checked ?
                (this.createList(allCategories))
                : (this.createList(allCategories, cat => cat.budget));

        });
        nameSortBTN.addEventListener('click', () => {
            container.innerHTML = '';
            this.currentCategoriesShown.sort(this.nameSort);
            this.createList();
        });
        fillSortBTN.addEventListener('click', () => {
            container.innerHTML = '';
            this.currentCategoriesShown.sort(this.fillSort);
            this.createList();
        });
    }

    nameSort(a, b) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        return 0;
    }

    fillSort(a, b) {
        if (a.value < b.value)
            return 1;
        else if (a.value > b.value)
            return -1;
        return 0;
    }

    generateBudgetView(category) {
        const budget = document.createElement('div');
        budget.setAttribute('class', 'budget');
        const main = document.createElement('div');
        main.setAttribute('class', 'main');
        const icons = document.createElement('div');
        icons.setAttribute('class', 'icons');
        const i = document.createElement('i');
        i.setAttribute('class', 'fas fa-trash');
        i.setAttribute('id', category._id);
        icons.append(i);
        const upper = document.createElement('div');
        const bottom = document.createElement('div');
        upper.setAttribute('class', 'upper');
        bottom.setAttribute('class', 'bottom');
        const name = document.createElement('span');
        name.innerText = category.name;
        const inputContainer = document.createElement('span');
        const input = document.createElement('input');
        inputContainer.setAttribute('class', 'test');
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'valueInput');
        input.setAttribute('value', category.budgetValue);
        input.style.background = 'transparent';
        const colorContainer = document.createElement('span');
        const colorInput = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        colorInput.setAttribute('class', 'colorInput');
        colorInput.value = category.color
        const progress = document.createElement('progress');
        progress.max = category.budgetValue || 0;
        progress.value = category.value; //

        //Listners

        i.addEventListener('click', async () => {
            let res = await request.removeCategory(category._id);
            if (res) {
                let deleteIndex = this.currentCategoriesShown.findIndex(arrCategory => arrCategory._id == category._id);
                this.currentCategoriesShown.splice(deleteIndex, 1);
                document.getElementById(`${category._id}`).remove();
            }
        })

        colorInput.addEventListener('input', () => {
            budget.style.background = colorInput.value;
            if (this.#checkBrightness(colorInput.value) < 50) {
                budget.style.color = 'white';
            } else {
                budget.style.color = 'black';
            }
        });

        colorInput.addEventListener('focusout', async () => {
            await request.editCategory(budget.id, colorInput.value);      //TODO hardcoded creatorid
            //TODO call this once the pace is offloaded, and change all categories changed.
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

        budget.style.background = category.color;
        budget.setAttribute('id', category._id);

        container.appendChild(budget);
    }

    generateNonBudgetView(category){
        const budget = document.createElement('div');
        budget.setAttribute('class', 'budget');
        const main = document.createElement('div');
        main.setAttribute('class', 'main');
        const icons = document.createElement('div');
        icons.setAttribute('class', 'icons');
        const i = document.createElement('i');
        i.setAttribute('class', 'fas fa-trash');
        i.setAttribute('id', category._id);
        icons.append(i);
        const name = document.createElement('span');
        name.innerText = category.name;
        const colorContainer = document.createElement('span');
        const colorInput = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        colorInput.setAttribute('class', 'colorInput');
        colorInput.value = category.color

        //Listners

        i.addEventListener('click', async () => {
            let res = await request.removeCategory(category._id);
            if (res) {
                let deleteIndex = this.currentCategoriesShown.findIndex(arrCategory => arrCategory._id == category._id);
                this.currentCategoriesShown.splice(deleteIndex, 1);
                document.getElementById(`${category._id}`).remove();
            }
        })

        colorInput.addEventListener('input', () => {
            budget.style.background = colorInput.value;
            if (this.#checkBrightness(colorInput.value) < 50) {
                budget.style.color = 'white';
            } else {
                budget.style.color = 'black';
            }
        });

        colorInput.addEventListener('focusout', async () => {
            await request.editCategory(budget.id, colorInput.value);      //TODO hardcoded creatorid
            //TODO call this once the pace is offloaded, and change all categories changed.
        });

        colorContainer.appendChild(colorInput);

        main.appendChild(name);
        main.appendChild(colorContainer);

        budget.appendChild(main);
        budget.appendChild(icons);

        budget.style.background = category.color;
        budget.setAttribute('id', category._id);

        container.appendChild(budget);
    }

    #checkBrightness(color) {
        let c = color.substring(1);
        let rgb = parseInt(c, 16);
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >> 8) & 0xff;
        let b = (rgb >> 0) & 0xff;

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
}