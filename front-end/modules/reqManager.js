const URL = "http://127.0.0.1:3000";

export default class RequestManager {
    async addTransaction(content) {
        let toReturn;
        await fetch(URL + '/transactions/add', {
            method: 'POST',
            headers: {
                'transaction': content,
            }
        }).then(res => res.json())
            .then(data => {
                if (data.message) toReturn = data;
                else toReturn = data;
            })
        return toReturn;
    }

    async removeTransaction(id) {
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


    async editTransaction(id, newValue, newMessage) {
        let toRet;
        await fetch(URL + '/transactions/patch', {
            method: 'PATCH',
            headers: {
                'id': id,
                'newvalue': newValue,
                'newMessage': newMessage
            }
        }).then(res => res.json())
            .then(data => toRet = [data[0], data[1]]); //Data[0] is the new transaction, data[1] is the difference in value :)
        return toRet;
    }

    async getAllTransactions() {
        let toRet;
        await fetch(URL + '/transactions/get', {
            method: 'GET',
        }).then(res => res.json())
            .then(data => toRet = data);
        return toRet;
    }

    async getAllCategories() {
        return await fetch(URL + '/categories/get', {
            method: 'GET',
            headers: {
                'creatorId': '1234'
            }
        }).then(res => res.json());
    }

    async addCategory(content){
        return await fetch(URL + '/categories/add', {
            method: 'POST',
            headers: {
                'category' : content,
            }
        }).then(res => res.json())
            .then(data => data)
    }

    async removeCategory(id) {
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

    async editCategory(id, color) {
        await fetch(URL + '/categories/patch', {
            method: 'PATCH',
            headers: {
                '_id': id,
                'color': color
            }
        })
    }
}