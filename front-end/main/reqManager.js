const URL = "http://127.0.0.1:3000";

const add = async (type_, value_, recursive_, category_, ammountToSave_) => {
    let toReturn;
    await fetch(URL + '/add', {
        method: 'POST',
        headers: {
            'value': Number(value_),
            'category': category_,
            'recursive': recursive_,
            'ammountToSave': Number(ammountToSave_),
            'type': type_
        }
    }).then(res => res.json())
        .then(data => toReturn = data.transaction)
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

const edit = (id) => {

}

const fillContainer = () => {
    fetch(URL + '/', {
        method: 'GET'
    }).then(res => res.json())
        .then(data => updateList(data));
}