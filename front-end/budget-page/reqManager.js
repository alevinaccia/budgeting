const URL = "http://127.0.0.1:3000";

const getOptions = async (creatorId) => {
    fetch(URL + '/options/get', {
        method : 'GET',
        headers : {
            'creatorId' : creatorId,
        }
    }).then(response => response.json())
    .then(data => createList(data));
}

const remove = async (id) => {
    let returnValue;
    await fetch(URL + '/options/delete', {
        method: 'DELETE',
        headers: {
          '_id': id
        }
    }).then(res => res.json())
        .then(data => returnValue = data)
    return returnValue;
}