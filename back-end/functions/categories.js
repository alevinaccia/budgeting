const Category = require('../model/category.js');

const handle = async (name, createrId, budgetValue) => {
    //TODO handle the category of the transaction
}

const create = async (name, creatorId, budgetValue) => {
    if(!await exists(name, creatorId)){
        return new Category({
            'name' : name,
            'creatorId' : creatorId,
            'color' : randomHex(),
            'budgetValue' : Number(budgetValue) > 0 ? Number(budgetValue) : null,
            'budget' : Number(budgetValue) > 0 ? true : false
        }).save();
    }
}

const exists = async (name, creatorId) => {
    const temp = await Category.find({'name' : name, 'creatorId' : creatorId}); 
    if(Object.entries(temp).length === 0){
        return false;
    } 
    return true;
}   

const get = async (creatorId) => {
    return await Category.find({'creatorId' : creatorId});
}

const remove = async (id) => {
    let removeOp = await Category.deleteOne({ '_id' : id });
    return removeOp.deletedCount;
}

//TODO move to a functions file

const randomHex = () => {
    return `#${Math.floor(Math.random()* 16777215).toString(16)}`;
}

module.exports = {create , get , exists, remove};