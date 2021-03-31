import Request from './reqManager.js';
const request = new Request;

const container = document.querySelector(".container");
const formContainer = document.querySelector(".form");
const emptyMessage = document.querySelector(".emptyMessage");
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

    //Create
    let div = document.createElement("div");
    div.setAttribute("class", "transaction");
    div.setAttribute("id", transaction._id);
    //span with actual value
    let span = document.createElement("span");
    span.textContent = `${transaction.value}€  ${transaction.text}`;

    //Icons
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "icons");
    let trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fas fa-trash-alt");
    let penIcon = document.createElement("i");
    penIcon.setAttribute("class", "fas fa-pen");

    //Edit-mode
    let editDiv = document.createElement("div");
    editDiv.setAttribute("class", "edit display-none");
    let icons = document.createElement("div");
    icons.setAttribute("class", "iconsEdit");
    let confirm = document.createElement("i");
    confirm.setAttribute("class", "fas fa-check confirm");
    let cancel = document.createElement("i");
    cancel.setAttribute("class", "fas fa-times");
    let numberEdit = document.createElement("input");
    numberEdit.setAttribute("class", "numberEdit");
    numberEdit.setAttribute("placeHolder", transaction.value);
    numberEdit.setAttribute("type", "number");
    let euroIcon = document.createElement("i");
    euroIcon.setAttribute("class", "fas fa-euro-sign");
    let textEdit = document.createElement("input");
    textEdit.setAttribute("type", "text");
    textEdit.setAttribute("class", "textEdit");
    textEdit.setAttribute("placeHolder", transaction.text);
    icons.appendChild(cancel);
    icons.appendChild(confirm);

    //Add Listners
    trashIcon.addEventListener("click", async (event) => {
      const id = event.target.parentNode.parentNode.id;
      await request.remove(id);
      document.getElementById(`${id}`).remove();
      this.updateBalance(transaction, "remove");
    });
    penIcon.addEventListener("click", (event) => {
      this.toggleEdit(event.target.parentNode.parentNode.id);
    });
    confirm.addEventListener("click", async (event) => {
      let id = event.target.parentNode.parentNode.parentNode.id;
      await request.edit(id, numberEdit.value, textEdit.value)
        .then(res => this.updateTransaction(res[0], res[1]))
        .then(data => transaction = data);
    });
    cancel.addEventListener("click", (event) => {
      this.toggleEdit(event.target.parentNode.parentNode.parentNode.id);
    });

    //Style
    transaction.type
      ? div.classList.add("income")
      : div.classList.add("outcome");

    //Append everything
    innerDiv.appendChild(trashIcon);
    innerDiv.appendChild(penIcon);
    editDiv.appendChild(numberEdit);
    editDiv.appendChild(euroIcon);
    editDiv.appendChild(textEdit);
    editDiv.appendChild(icons);
    div.appendChild(span);
    div.appendChild(innerDiv);
    div.appendChild(editDiv);
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
  updateBalanceByDifference(difference) {
    let currentBalance = Number(balance.textContent);
    balance.textContent = currentBalance + difference;
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
    this.updateBalanceByDifference(difference);
    return transaction;
  };

  toggleEdit(id) {
    let div = document.getElementById(`${id}`);
    div.children[0].classList.toggle("display-none");
    div.children[1].classList.toggle("display-none");
    div.children[2].classList.toggle("display-none");
  };

  //Toggles between form and transaction view
  switchContainer() {
    container.style.background = "rgba(46 ,51 ,78, 0.3)";
    transactionsContainer.classList.toggle("display-none");
    formContainer.classList.toggle("display-none");
    container.classList.toggle("scroll-none");
  };

}
