const addBTN = document.querySelector('.addBTN');
const valueInput = document.querySelector('.valueInput');
const transactionsContainer = document.querySelector('.transactions');
const recursive = document.querySelector('.recursiveBox');
const category = document.querySelector('.category');
const message = document.querySelector('.text');
const formContainer = document.querySelector('.form');
const switchElement = document.querySelector('.slider');
const container = document.querySelector('.container');
const ammountToSave = document.querySelector('.ammountToSave');
const bubble = document.querySelector('.bubble');
const close = document.querySelector('.close');
const balance = document.querySelector('.balance');
const emptyMessage = document.querySelector('.emptyMessage');
const recursivePeriod = document.querySelector('.period');

//Edit mode
const newValue = document.querySelector('.numberEdit');
const newText = document.querySelector('.textEdit');

window.onload = () => {
    fillContainer();
}

addBTN.addEventListener('click', async () => {
    if (formContainer.classList.contains('display-none')) {
        switchContainer();
        clearForm();
    } else {
        //The "add" method return the new transaction added to the database, so we can update the UI
        let period = null;
        if(recursive.checked){
            period = recursivePeriod.value;
        }

        let response = await add(switchElement.checked, valueInput.value, period,category.value, ammountToSave.value, message.value);
        if(response.message){
            handleError(response.message);
        }else{
            addTransactionToView(response);
            switchContainer();
        }
    }
})
//Change the bg color of the main container based on the switch position
switchElement.addEventListener('change', () => {
    switchElement.checked ? container.style.background = 'rgba(0 ,255 ,0, 0.3)' : container.style.background = 'rgba(255, 0, 0, 0.3)';
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
    if (valueInput.value == 0) valueInput.value = '';
})

recursive.addEventListener('click', () => {
    recursivePeriod.classList.toggle('display-none');
})

const updateList = (list) => {
    let array = Array.from(list);
    if (array.length == 0) {
        emptyMessage.classList.toggle('display-none');
    } else {
        array.forEach((transaction) => {
            addTransactionToView(transaction);
        })
    }
}

const switchContainer = () => {
    container.style.background = "rgba(46 ,51 ,78, 0.3)"
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

const updateBalanceByDifference = (difference) => {
    let currentBalance = Number(balance.textContent);
    balance.textContent = currentBalance + difference;
    console.log(difference);
}

const addTransactionToView = (transaction) => {
    if(!emptyMessage.classList.contains('display-none')) emptyMessage.classList.toggle('display-none');

    //Create
    let div = document.createElement('div');
    div.setAttribute('class', 'transaction');
    div.setAttribute('id', transaction._id);
    //span with actual value
    let span = document.createElement('span');
    span.textContent = `${transaction.value}€  ${transaction.text}`

    //Icons
    let innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'icons');
    let trashIcon = document.createElement('i');
    trashIcon.setAttribute('class', 'fas fa-trash-alt');
    let penIcon = document.createElement('i');
    penIcon.setAttribute('class', 'fas fa-pen');

    //Edit-mode
    let editDiv = document.createElement('div');
    editDiv.setAttribute('class', 'edit display-none'); 
    let icons = document.createElement('div');
    icons.setAttribute('class', "iconsEdit");
    let confirm = document.createElement('i');
    confirm.setAttribute('class', 'fas fa-check confirm');
    let cancel = document.createElement('i');
    cancel.setAttribute('class', 'fas fa-times');
    let numberEdit = document.createElement('input');
    numberEdit.setAttribute('class', 'numberEdit');
    numberEdit.setAttribute('placeHolder', transaction.value);
    numberEdit.setAttribute('type', 'number');
    let euroIcon = document.createElement('i');
    euroIcon.setAttribute('class', 'fas fa-euro-sign');
    let textEdit = document.createElement('input');
    textEdit.setAttribute('type', 'text');
    textEdit.setAttribute('class', 'textEdit');
    textEdit.setAttribute('placeHolder', transaction.text);
    icons.appendChild(cancel);
    icons.appendChild(confirm);

    //Add Listners
    trashIcon.addEventListener('click', async (event) => {
        const id = event.target.parentNode.parentNode.id;
        await remove(id)
        document.getElementById(`${id}`).remove();
        updateBalance(transaction, 'remove');
    })
    penIcon.addEventListener('click', (event) => {
        toggleEdit(event.target.parentNode.parentNode.id);
    })
    confirm.addEventListener('click' ,async (event) => {
        let id = event.target.parentNode.parentNode.parentNode.id;
        await edit(id, numberEdit.value, textEdit.value);
    })
    cancel.addEventListener('click', (event) => {
        toggleEdit(event.target.parentNode.parentNode.parentNode.id);
    })

    //Style
    transaction.type ? div.classList.add('income') : div.classList.add('outcome')

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
    updateBalance(transaction, 'add');
}

const updateTransaction = (transaction, difference) => {
    toggleEdit(transaction._id);
    let div = document.getElementById(`${transaction._id}`);
    div.childNodes[0].textContent = `${transaction.value}€  ${transaction.text}`;
    updateBalanceByDifference(difference);
}

const handleError = (err) => {
    if(err.search('value') > -1){
        valueInput.style.border = "2px solid red";
    }else{
        valueInput.style.border = "";
    }

    if(err.search('text') > -1){
        message.style.border = "2px solid red";
    }else{
        message.style.border = "";
    }
}

const clearForm = () => {
    //Switch
    switchElement.checked = true;
    container.style.background = "rgba(0 ,255 ,0, 0.4)"
    //Value
    valueInput.value = 0;
    valueInput.style.border = "";
    //Message
    message.value = ""
    message.style.border = "";
    //Checkbok
    recursive.checked = false;
    //AmmountToSave
    document.querySelector('.max').textContent = "100";
    ammountToSave.value = 0;
}

const toggleEdit = (id) => {
    let div = document.getElementById(`${id}`);
    div.children[0].classList.toggle('display-none');
    div.children[1].classList.toggle('display-none');
    div.children[2].classList.toggle('display-none');
}