const URL = "http://127.0.0.1:3000";

const add = async (type_, value_, recursivePeriod_, category_, ammountToSave_, text_) => {
    let toReturn;
    await fetch(URL + '/transactions/add', {
        method: 'POST',
        headers: {
            'value': Number(value_),
            'category': category_,
            'recursivePeriod': recursivePeriod_,
            'ammountToSave': Number(ammountToSave_),
            'type': type_,
            'text': text_
        }
    }).then(res => res.json())
        .then(data => {
            if (data.message) toReturn = data;
            else toReturn = data;
        })
    return toReturn;
}

const remove = async (id) => {
    let returnValue;
    await fetch(URL + '/transactions/delete', {
        method: 'DELETE',
        headers: {
            '_id': id
        }
    }).then(res => res.json())
        .then(data => returnValue = data)
    return returnValue;
}

const edit = (id, newValue, newMessage) => {
    fetch(URL + '/transactions/patch', {
        method: 'PATCH',
        headers: {
            'id': id,
            'newvalue': newValue,
            'newMessage': newMessage
        }
    }).then(res => res.json())
        .then(data => updateTransaction(data[0], data[1])) //Data[0] is the new transaction, data[1] is the difference in value :)
}

const fillContainer = () => {
    fetch(URL + '/transactions/get', {
        method: 'GET',
    }).then(res => res.json())
        .then(data => updateList(data));
}

const loadCategories = () => { 
    fetch(URL + '/options/get', {
        method: 'GET',
        headers : {
            'creatorId' : '1234'
        }
    }).then(res => res.json())
        .then(data => updateCategories(data));
}