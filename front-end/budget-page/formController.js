import request from '../modules/reqManager.js';
import category from '../../category.js';
import ContainerController from './budgetContainerController.js';

const containerController = new ContainerController;
const req = new request;
const form = document.querySelector('.form')

export default class Form {
    async sendReq() {//TODO continue
        let newCategory = await req.addCategory(JSON.stringify(new category(
            form.name.value,
            form.color.value,
            '1234',
            form.budget.checked,
            form.value.value,
            form.period.value
        )));
        containerController.addElementToList(newCategory);
        this.clearForm();
        containerController.switchContainer();
    }

    clearForm() {
        form.reset();
    }
}