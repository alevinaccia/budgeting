import Request from '../modules/reqManager.js';
const request = new Request;

const container = document.querySelector(".container");
const formContainer = document.querySelector(".form");
const emptyMessage = document.querySelector(".emptyMessage");
const connectionError = document.querySelector(".connectionError");
const transactionsContainer = document.querySelector(".transactions");
const balance = document.querySelector(".balance");

export default class ContainerController {
  //This method handles the response from the api
  handleResponse(response){
    this.#addTransactionToView(response.transaction);
    console.log(response) //TODO Continue
  }

  //This method generates the html element
  #addTransactionToView(transaction) {
    if (!emptyMessage.classList.contains("display-none"))
      emptyMessage.classList.toggle("display-none");

    let div = document.createElement('div');
    div.classList.add('transaction');
    let category = document.createElement('div');
    category.classList.add('categoryColor');
    category.style.background = transaction.color;
    let name = document.createElement('h2');
    name.classList.add('transactionName');
    name.innerText = transaction.text;
    let value = document.createElement('h2');
    value.classList.add('transactionValue');
    let prefix = transaction.value ? '+' : '-' ;
    value.innerText = `${prefix}${transaction.value}€`;
    transactionsContainer.prepend(div);

    if(transaction.value){
      value.style.color = 'green' //TODO get cooler colors
    }else{
      value.style.color = 'red'
    }

    div.appendChild(category);
    div.appendChild(name);
    div.appendChild(value);

    transactionsContainer.prepend(div);

    //Update balance
    this.updateBalance(transaction, "add");
  };

  //updates the balance(used when a new is added)
  updateBalance(transaction, operation) {
    let currentBalance = Number(balance.textContent);
    let newBalance;
    
    if (operation == "add") {
      transaction.type
        ? (newBalance = currentBalance + transaction.value)
        : (newBalance = currentBalance - transaction.value);
    } else if (operation == "remove") {
      transaction.type
        ? (newBalance = currentBalance - transaction.value)
        : (newBalance = currentBalance + transaction.value);
    }

    balance.textContent = newBalance;
  };

  //updates the balance(used when an existing one is modified)
  updateBalanceByDifference(difference, type) {
    let currentBalance = Number(balance.textContent);
    if(type){
      balance.textContent = currentBalance + difference;
    }else{
      balance.textContent = currentBalance - difference;
    }  
  };

  //Creates the list, iterating the addTransactionToView method
  createList(list) {
    let array = Array.from(list);
    if (array.length == 0) {
      emptyMessage.classList.toggle("display-none");
    } else {
      array.forEach((transaction) => {
        this.#addTransactionToView(transaction);
      });
    }
  };

  //visual change, after a transaction is modified
  updateTransaction(transaction, difference) {
    this.toggleEdit(transaction._id);
    let div = document.getElementById(`${transaction._id}`);
    div.childNodes[0].textContent = `${transaction.value}€  ${transaction.text}`;
    div.childNodes[2].childNodes[0].setAttribute(
      "placeholder",
      `${transaction.value}`
    );
    div.childNodes[2].childNodes[0].value = "";
    div.childNodes[2].childNodes[2].setAttribute(
      "placeholder",
      `${transaction.text}`
    );
    div.childNodes[2].childNodes[2].value = "";
    this.updateBalanceByDifference(difference, transaction.type);
    return transaction;
  };

  toggleConnectionError(){
    connectionError.classList.toggle("display-none");
  }

  toggleEdit(id) {
    let div = document.getElementById(`${id}`);
    div.children[0].classList.toggle("display-none");
    div.children[1].classList.toggle("display-none");
    div.children[2].classList.toggle("display-none");
  };

  //Toggles between form and transaction view
  switchContainer() {
    transactionsContainer.classList.toggle("display-none");
    formContainer.classList.toggle("display-none");
    container.classList.toggle("scroll-none");
  };

}
