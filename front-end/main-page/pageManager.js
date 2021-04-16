import Form from './formController.js';
import Container from './containerController.js';
import Request from '../modules/reqManager.js';

const request = new Request;
const form = new Form;
const containerManager = new Container;

const addBTN = document.querySelector('.addBTN');
const formContainer = document.querySelector('.form');



window.onload = async () => {
  try {
    containerManager.createList(await request.getAllTransactions());
  }catch(err){
    containerManager.toggleConnectionError();
  }
  form.createCategories(await request.getAllCategories());
  form.addListeners();
};

window.onscroll = () => {
  scrollTo(0,0);
}

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

