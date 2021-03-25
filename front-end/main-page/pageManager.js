import Form from './formController.js';
import Container from './containerController.js';
import Request from './reqManager.js';

const request = new Request;
const form = new Form;
const containerManager = new Container;

const addBTN = document.querySelector(".addBTN");
const valueInput = document.querySelector(".valueInput");
const transactionsContainer = document.querySelector(".transactions");
const recursive = document.querySelector(".recursiveBox");
const category = document.querySelector(".category-list");
const categoryList = document.getElementById("category-list");
const message = document.querySelector(".text");
const formContainer = document.querySelector(".form");
const switchElement = document.querySelector(".slider");
const ammountToSave = document.querySelector(".ammountToSave");
const bubble = document.querySelector(".bubble");
const close = document.querySelector(".close");
const balance = document.querySelector(".balance");
const emptyMessage = document.querySelector(".emptyMessage");
const recursivePeriod = document.querySelector(".period");

//Edit mode
const newValue = document.querySelector(".numberEdit");
const newText = document.querySelector(".textEdit");

window.onload = async () => {
  containerManager.createList(await request.fillContainer());
  form.createCategories(await request.loadCategories());
  addListeners();
};

const addListeners = () => {
  addBTN.addEventListener("click", async () => {
    if (formContainer.classList.contains("display-none")) {
      containerManager.switchContainer();
      form.clearForm();
    } else {
      //The "add" method return the new transaction added to the database, so we can update the UI
      let period = null;
      if (recursive.checked) {
        period = recursivePeriod.value;
      }

      let response = await request.add(
        switchElement.checked,
        valueInput.value,
        period,
        category.value,
        ammountToSave.value,
        message.value
      );
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
      } else {
        containerManager.addTransactionToView(response.transaction);
        if (response.option) form.addCategory(response.option);
        containerManager.switchContainer();
      }
    }
  });
  //Change the bg color of the main container based on the switch position
  switchElement.addEventListener("change", () => {
    switchElement.checked
      ? (container.style.background = "rgba(0 ,255 ,0, 0.3)")
      : (container.style.background = "rgba(255, 0, 0, 0.3)");
  });

  close.addEventListener("click", () => {
    containerManager.switchContainer();
  });

  ammountToSave.addEventListener("input", () => {
    let value = ammountToSave.value;
    bubble.textContent = value;
    //Interopolates in base 100
    bubble.style.left = (100 * value) / ammountToSave.max + "%";
    bubble.classList.add("show");
  });

  ammountToSave.addEventListener("blur", () => {
    bubble.classList.remove("show");
  });

  valueInput.addEventListener("change", (event) => {
    document.querySelector(".max").textContent = event.target.value;
    ammountToSave.setAttribute("max", event.target.value);
    ammountToSave.value = 0;
  });

  valueInput.addEventListener("focus", () => {
    if (valueInput.value == 0) valueInput.value = "";
  });

  recursive.addEventListener("click", () => {
    recursivePeriod.classList.toggle("display-none");
  });
};
