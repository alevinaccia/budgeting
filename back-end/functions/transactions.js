const Transaction = require('../model/transaction.js');

const create = (value, category, recursive, ammountToSave, type) => {
    return transaction = new Transaction({
        'value': value,
        'date' : new Date().getUTCDate(),
        'category' : category,
        'recursive' : recursive,
        'ammountToSave' : ammountToSave,
        'type' : type
    })
}

const get = async () => {
    return await Transaction.find((err, transactions) => {
        if(err) return err;
        return transactions;
    })
}

const remove = async(id) => {
    let removeOp = await Transaction.deleteOne({ _id: id });
    return removeOp.deletedCount;
}

exports.create = create;
exports.get = get;
exports.remove = remove;