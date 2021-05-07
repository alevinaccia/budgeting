const Category = require('../model/category.js');

const handle = async (name, creatorId, budgetValue, transactionValue) => {
    if (!await exists(name, creatorId)) {
        return { information: await createFromTransaction(name, creatorId, budgetValue), new: true };
    } else {
        update(name, creatorId, transactionValue);
        return { information: await Category.findOne({ 'name': name, 'creatorId': creatorId }), new: false };
    }
}

const createFromTransaction = async (name, creatorId, budgetValue) => {
    await new Category({
        'name': name,
        'creatorId': creatorId,
        'color': randomHex(),
        'budgetValue': Number(budgetValue) > 0 ? Number(budgetValue) : null,
        'budget': Number(budgetValue) > 0 ? true : false,
    }).save();
    return await Category.findOne({ 'name': name, 'creatorId': creatorId });
}

const add = async (newcategory) => {
    console.log(newcategory);
    await new Category({
        'name': newcategory.name,
        'creatorId': newcategory.creatorId,
        'color': newcategory.color || randomHex(),
        'budgetValue': newcategory.budget ? Number(newcategory.budgetValue) : null,
        'budget': newcategory.budget,
        'budgetPeriod' : newcategory.budgetPeriod
    }).save();
    return await Category.findOne({ 'name': newcategory.name, 'creatorId': newcategory.creatorId });
}

const exists = async (name, creatorId) => {
    const temp = await Category.find({ 'name': name, 'creatorId': creatorId });
    if (Object.entries(temp).length === 0) {
        return false;
    }
    return true;
}

const update = async (name, creatorId, transactionValue) => {
    let category = await Category.findOne({ 'name': name, 'creatorId': creatorId });
    let value = Number(category.value) + Math.abs(Number(transactionValue));
    await Category.findOneAndUpdate({ 'name': name, 'creatorId': creatorId },
        { 'value': value }
    )
    return await Category.findOne({ 'name': name, 'creatorId': creatorId });
}

const changeColor = async (id, color) => {
    return await Category.findByIdAndUpdate(id, {
        'color': color,
    })
}


const get = async (creatorId) => {
    return await Category.find({ 'creatorId': creatorId });
}

const remove = async (id) => {
    let removeOp = await Category.deleteOne({ '_id': id });
    return removeOp.deletedCount;
}

//TODO move to a functions file

const randomHex = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = { add, get, exists, remove, handle, changeColor };