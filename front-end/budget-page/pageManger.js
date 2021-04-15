import Request from "../modules/reqManager.js";
import budgetContainerController from "./budgetContainerController.js";
import Form from "./formController.js"

const containerController = new budgetContainerController();
const request = new Request;
const form = new Form;
const addBTN = document.querySelector('.addBTN');

window.onload = async () => {
    containerController.createList(await request.getAllCategories(), cat => cat.budget); //TODO creator id hard coded
}

addBTN.addEventListener("click", async () => {
    if (formContainer.classList.contains("display-none")) {
        containerController.switchContainer();
        form.clearForm();
    } else {
        let response = await form.sendReq();
        if (response) {
            containerController.handleResponse(response);
            containerController.switchContainer();
        }
    }
});