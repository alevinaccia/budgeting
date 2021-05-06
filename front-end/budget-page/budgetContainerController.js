import Request from "../modules/reqManager.js";
const request = new Request;
const container = document.querySelector('.categories');
const showAllCheck = document.querySelector('.showAllCheckbox');
const formContainer = document.querySelector('.formContainer');
const sortSelect = document.querySelector('.sortSelect');

export default class budgetContainerController {
    constructor() {
        this.currentCategoriesShown = [];
        this.addListners();
    }

    switchContainer() {
        container.classList.toggle("display-none");
        formContainer.classList.toggle("display-none");
    }

    createList(list = this.currentCategoriesShown, param = cat => cat) {
        this.currentCategoriesShown = list.filter(param);
        this.currentCategoriesShown.forEach((category) => {
            this.addElementToList(category)
        })
    }

    addElementToList(category) {
        if (category.budget)
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

        sortSelect.addEventListener('change', () => {
            if (sortSelect.value == 'fill') {
                container.innerHTML = '';
                this.currentCategoriesShown.sort(this.fillSort);
                this.createList();
            } else if (sortSelect.value == 'name') {
                container.innerHTML = '';
                this.currentCategoriesShown.sort(this.nameSort);
                this.createList();
            }
        })
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
        budget.classList.add('budgetCategory');
        const top = document.createElement('div');
        top.classList.add('top');
        const name = document.createElement('div');
        name.classList.add('name');
        const title = document.createElement('span');
        title.classList.add('catTitle');
        title.innerText = category.name;
        const subTitle = document.createElement('span')
        subTitle.classList.add('catSubtitle');
        //TODO category recursive period
        name.append(title);
        name.append(subTitle);
        top.append(name);

        const colorInput = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        top.append(colorInput);

        const catValue = document.createElement('span');
        catValue.classList.add('catValue');
        catValue.innerText = `${category.value}€`;
        top.append(catValue);

        budget.append(top);

        const progress = document.createElement('progress');
        progress.max = category.budgetValue;
        progress.value = category.value;

        budget.append(progress);

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

        let lastTap;

        budget.addEventListener('touchend', async (event) => {
            console.log("pressed");
            let now = new Date().getTime();
            let timeFromLastTap = now - lastTap;
            if ((timeFromLastTap < 600) && (timeFromLastTap > 0)) {
                const id = event.target.id;
                await request.removeCategory(id);
                document.getElementById(`${id}`).remove();
                event.preventDefault();
            }
            lastTap = new Date().getTime();
        })

        budget.id = category._id;

        container.appendChild(budget);
    }

    generateNonBudgetView(category) {
        const budget = document.createElement('div');
        budget.classList.add('nonBudgetCategory');
        const name = document.createElement('div');
        name.classList.add('name');
        name.innerText = category.name;
        budget.append(name);

        const colorInput = document.createElement('input');
        colorInput.setAttribute('type', 'color');
        budget.append(colorInput);

        const catValue = document.createElement('span');
        catValue.classList.add('catValue');
        catValue.innerText = `${category.value}€`;
        budget.append(catValue);

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

        let lastTap;

        budget.addEventListener('touchend', async (event) => {
            console.log("pressed");
            let now = new Date().getTime();
            let timeFromLastTap = now - lastTap;
            if ((timeFromLastTap < 600) && (timeFromLastTap > 0)) {
                const id = event.target.id;
                await request.removeCategory(id);
                document.getElementById(`${id}`).remove();
                event.preventDefault();
            }
            lastTap = new Date().getTime();
        })

        budget.id = category._id;

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