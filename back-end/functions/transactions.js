const Transaction = require('../model/transaction.js');

const create = (request) => {

    let nextAddition = calculateNextAddition(request.period);

    return transaction = new Transaction({
        'value': request.value,
        'date': new Date(),
        'category': request.category,
        'ammountToSave': request.ammountToSave,
        'type': request.type,
        'text': request.message,
        'recursivePeriod': request.period,
        'nextAddition': nextAddition
    })
}

const get = async () => {
    return await Transaction.find((err, transactions) => {
        if (err) return err;
        return transactions;
    })
}

const remove = async (id) => {
    let removeOp = await Transaction.deleteOne({ _id: id });
    return removeOp.deletedCount;
}

const edit = async (id, newValue, newMessage) => {
    let preEdit = await Transaction.findById(id);
    await Transaction.updateOne({_id : id} , {
        value : newValue || preEdit.value,
        text : newMessage || preEdit.text
    });
    return [await Transaction.findOne({_id : id}), newValue ? (newValue - preEdit.value) : 0];
} 

const calculateNextAddition = (period) => {
    let nextAddition = new Date();
    nextAddition.setHours(0, 0, 0, 0);
    switch (period) {
        case 'daily':
            nextAddition.setDate(nextAddition.getDate() + 1);
            return nextAddition;
        case 'weekly':
            nextAddition.setDate(nextAddition.getDate() + 7);
            return nextAddition;
        case 'monthly':
            nextAddition.setDate(nextAddition.getMonth() + 1);
            return nextAddition;
        default:
            return null;
    }
}

const updateRecursive = async () => {
    await Transaction.find({'recursivePeriod': { $ne : 'null' }} ,async (err, transactions) => {
        if (err) return err;
        const workable = Array.from(transactions);
        for(let i = 0; i < workable.length; i++){
            let currentDate = new Date();
            let recursiveTime = new Date(workable[i].nextAddition);
            if(currentDate.getTime() >= recursiveTime.getTime()){
                await Transaction.updateOne({_id : workable[i]._id} , {nextAddition : calculateNextAddition('weekly')});
            }
        }
    })
}

module.exports = {create, get , remove , edit , updateRecursive}
