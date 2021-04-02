const URL = "http://127.0.0.1:3000";

const getOptions = async (creatorId) => {
    fetch(URL + '/categories/get', {
        method : 'GET',
        headers : {
            'creatorId' : creatorId,
        }
    }).then(response => response.json())
    .then(data => createList(data));
}

const remove = async (id) => {
    let returnValue;
    await fetch(URL + '/categories/delete', {
        method: 'DELETE',
        headers: {
          '_id': id
        }
    }).then(res => res.json())
        .then(data => returnValue = data)
    return returnValue;
}

const update = async (id, color) => {
    await fetch(URL + '/categories/patch', {
        method: 'PATCH',
        headers: {
          '_id': id,
          'color' : color
        }
    })
}