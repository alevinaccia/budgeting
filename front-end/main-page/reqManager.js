const URL = "http://127.0.0.1:3000";

export default class RequestManager {
    async add(type_, value_, recursivePeriod_, category_, ammountToSave_, text_){
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
    
    async remove(id){
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

    
    async edit(id, newValue, newMessage){
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
    
    async fillContainer(){
        let toRet;
        await fetch(URL + '/transactions/get', {
            method: 'GET',
        }).then(res => res.json())
            .then(data => toRet = data);
        return toRet;
    }
    
    async loadCategories(){ 
        let toRet;
        await fetch(URL + '/categories/get', {
            method: 'GET',
            headers : {
                'creatorId' : '1234'
            }
        }).then(res => res.json())
            .then(data => toRet = data);
        return toRet;
    }
}