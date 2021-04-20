import Request from '../modules/reqManager.js';
import Transaction from '../../transaction.js';
import ContainerManager from './containerController.js';

const containerManager = new ContainerManager;
const request = new Request;

const container = document.querySelector(".container");
const valueInput = document.querySelector(".valueInput");
const recursive = document.querySelector(".recursiveBox");
const category = document.querySelector(".category-list");
const categoryList = document.getElementById("category-list");
const message = document.querySelector(".textInput");
const budgetSetting = document.querySelector('.budget-settings');
const close = document.querySelector(".close");
const recursivePeriod = document.querySelector(".period");
const budgetValue = document.querySelector(".budget-value");

//Type btns;
const incomeBTN = document.querySelector('.incomeBTN')
const expenseBTN = document.querySelector('.expenseBTN')

export default class FormController {
    constructor(){
        this.type;
    }

    addListeners() {
        //Change the bg color of the main container based on the switch position
        close.addEventListener("click", () => {
            containerManager.switchContainer();
        });

        valueInput.addEventListener("focus", () => {
            if (valueInput.value == 0) valueInput.value = "";
        });

        incomeBTN.addEventListener('click', () => {
            incomeBTN.style.background = 'green';
            expenseBTN.style.background = 'white';
            this.type = true;
        })
        
        expenseBTN.addEventListener('click', () => {
            expenseBTN.style.background = 'red';
            incomeBTN.style.background = 'white';
            this.type = false;
        })
    };

    async sendReq() {
        //The "add" method return the new transaction added to the database, so we can update the UI
        let period = null;
        if (recursivePeriod.value != "none") {
            period = recursivePeriod.value
        }

        let response = await request.addTransaction(
            JSON.stringify(
                new Transaction(
                    valueInput.value,
                    category.value,
                    message.value,
                    period,
                    this.type,
                    budgetValue.value
                ),
            )
        );
        if (!this.handleError(response)) {
            this.type = null;
            return response;
        } else {
            return undefined;
        }
    }

    handleError(response) {
        if (response.message) {
            if (response.message.search("value") > -1) {
                valueInput.style.border = "2px solid red";
            } else {
                valueInput.style.border = "";
            }

            if (response.message.search("text") > -1) {
                message.style.border = "2px solid red";
            } else {
                message.style.border = "";
            }
            return true;
        } else {
            return false;
        }
    }

    //form reset
    clearForm() {
        //BTNs
        incomeBTN.style.background = 'white';
        expenseBTN.style.background = 'white';
        //Value
        valueInput.value = 0;
        valueInput.style.border = "";
        //Message
        message.value = "";
        message.style.border = "";
        //Category
        category.value = "";
        budgetValue.value = 0;
    };

    //inizializes the dataset
    createCategories(list) {
        const array = Array.from(list);
        array.forEach((cat) => {
            this.addCategory(cat);
        });
    };

    //add categories to the dataset
    addCategory(cat) {
        const option = document.createElement("option");
        option.setAttribute("value", cat.name);
        categoryList.appendChild(option);
    };

    //Toggles between income and outcome in the form
    switchType() {
        if (switchElement.checked) {
            // +Transaction
            container.style.background = "rgba(0 ,255 ,0, 0.3)";
            category.removeEventListener('change', this.#settingsSwitch);
            budgetSetting.classList.add('display-none');
        } else {
            // -Transaction
            container.style.background = "rgba(255, 0, 0, 0.3)";
            category.addEventListener('change', this.#settingsSwitch);
        }
    }

    //## Private methods ## 

    #settingsSwitch() {
        let debug = Array.from(categoryList.childNodes).filter((e) => e.value == category.value);
        if (debug.length == 0) {
            budgetSetting.classList.remove('display-none');
            return;
        } else {
            budgetSetting.classList.add('display-none');
            return;
        }
    }
}