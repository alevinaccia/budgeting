import Form from './formController.js';
import Container from './containerController.js';
import Request from './reqManager.js';

const request = new Request;
const form = new Form;
const containerManager = new Container;

const addBTN = document.querySelector('.addBTN');
const formContainer = document.querySelector('.form');



window.onload = async () => {
  containerManager.createList(await request.fillContainer());
  form.createCategories(await request.loadCategories());
  form.addListeners();
};

addBTN.addEventListener("click", async () => {
  if (formContainer.classList.contains("display-none")) {
    containerManager.switchContainer();
    form.clearForm();
  } else {
    let response = await form.sendReq();
    if (response) {
      containerManager.handleResponse(response);
      containerManager.switchContainer();
    }
  }
});

