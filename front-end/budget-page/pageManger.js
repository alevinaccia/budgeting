import Request from "../modules/reqManager.js";
import budgetContainerController from "./budgetContainerController.js";

const containerController = new budgetContainerController();
const request = new Request;


window.onload = async () => {
    containerController.createList(await request.getAllCategories(), cat => cat.vlaue); //TODO creator id hard coded
}