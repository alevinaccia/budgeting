const URL = "http://127.0.0.1:3000";

const add = async (type_, value_, recursivePeriod_, category_, ammountToSave_, text_) => {
    let toReturn;
    await fetch(URL + '/add', {
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
            else toReturn = data.transaction;
        })
    return toReturn;
}

const remove = async (id) => {
    let returnValue;
    await fetch(URL + '/', {
        method: 'DELETE',
        headers: {
            '_id': id
        }
    }).then(res => res.json())
        .then(data => returnValue = data)
    return returnValue;
}

const edit = (id, newValue, newMessage) => {
    fetch(URL + '/', {
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
    fetch(URL + '/', {
        method: 'GET',
    }).then(res => res.json())
        .then(data => updateList(data));
}