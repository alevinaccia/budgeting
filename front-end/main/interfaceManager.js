const addBTN = document.querySelector('.addBTN');
const valueInput = document.querySelector('.valueInput');
const transactionsContainer = document.querySelector('.transactions');
const recursive = document.querySelector('.recursiveBox');
const category = document.querySelector('.category');
const formContainer = document.querySelector('.form');
const switchElement = document.querySelector('.slider');
const container = document.querySelector('.container');
const ammountToSave = document.querySelector('.ammountToSave');
const bubble = document.querySelector('.bubble');
const close = document.querySelector('.close');
const balance = document.querySelector('.balance');

window.onload = () => {
    fillContainer();
}

addBTN.addEventListener('click', async () => {
    if (formContainer.classList.contains('display-none')) {
        switchContainer();
    } else {
        //The "add" method return the new transaction added to the database, so we can update the UI
        addTransactionToView(await add(switchElement.checked, valueInput.value, recursive.checked, category.value, ammountToSave.value));
        switchContainer();
    }
})
//Change the bg color of the main container based on the switch position
switchElement.addEventListener('change', () => {
    switchElement.checked ? container.style.background = 'rgba(125 ,205 ,133, 0.3)' : container.style.background = 'rgba(255, 113, 91, 0.3)';
})

close.addEventListener('click', () => {
    switchContainer();
})

ammountToSave.addEventListener('input', () => {
    let value = ammountToSave.value;
    bubble.textContent = value;
    //Interopolates in base 100
    bubble.style.left = ((100 * value) / ammountToSave.max) + "%";
    bubble.classList.add("show");
})

ammountToSave.addEventListener('blur', () => {
    bubble.classList.remove("show");
})

valueInput.addEventListener('change', (event) => {
    document.querySelector('.max').textContent = event.target.value;
    ammountToSave.setAttribute('max', event.target.value);
    ammountToSave.value = 0;
})

valueInput.addEventListener('focus', () => {
    if(valueInput.value == 0) valueInput.value = '';
})

const updateList = (list) => {
    let array = Array.from(list);
    array.forEach((transaction) => {
        addTransactionToView(transaction);
    })
}

const switchContainer = () => {
    transactionsContainer.classList.toggle('display-none');
    formContainer.classList.toggle('display-none');
    container.classList.toggle('scroll-none');
}

const updateBalance = (transaction, operation) => {
    let currentBalance = Number(balance.textContent);
    let newBalance;

    if (operation == 'add') {
        transaction.type ? (newBalance = currentBalance + transaction.value) : (newBalance = currentBalance - transaction.value);
    } else if (operation == 'remove') {
        transaction.type ? (newBalance = currentBalance - transaction.value) : (newBalance = currentBalance + transaction.value);
    }

    balance.textContent = newBalance;
}

const addTransactionToView = (transaction) => {
    //Create
    let div = document.createElement('div');
    div.setAttribute('class', 'transaction');
    div.setAttribute('id', transaction._id)
    div.textContent = `${transaction.value}€  ${transaction.category}`
    let innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'icons');
    let trashIcon = document.createElement('i');
    trashIcon.setAttribute('class', 'fas fa-trash-alt');
    let penIcon = document.createElement('i');
    penIcon.setAttribute('class', 'fas fa-pen');

    //Add Listners
    trashIcon.addEventListener('click', async (event) => {
        const id = event.target.parentNode.parentNode.id;
        await remove(id)
        document.getElementById(`${id}`).remove();
        updateBalance(transaction, 'remove');
    })
    penIcon.addEventListener('click', (event) => {
        //someotherfunction(id)
        console.log(event.target.parentNode.parentNode.id);
    })

    //Append everything
    innerDiv.appendChild(trashIcon);
    innerDiv.appendChild(penIcon);
    div.appendChild(innerDiv);
    transactionsContainer.appendChild(div);

    //Update balance
    updateBalance(transaction, 'add');
}
