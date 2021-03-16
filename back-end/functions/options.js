const option = require('../model/option.js');
const Option = require('../model/option.js');

const create = async (name, creatorId) => {
    if(!await exists(name, creatorId)){
        return new Option({
            'name' : name,
            'creatorId' : creatorId,
            'color' : randomHex(),
        }).save();
    }
}

const exists = async (name, creatorId) => {
    const temp = await Option.find({'name' : name, 'creatorId' : creatorId}); 
    if(Object.entries(temp).length === 0){
        return false;
    } 
    return true;
}   

const get = async (creatorId) => {
    return await Option.find({'creatorId' : creatorId});
}

const remove = async (id) => {
    let removeOp = await Option.deleteOne({ '_id' : id });
    return removeOp.deletedCount;
}

//TODO move to a functions file

const randomHex = () => {
    return `#${Math.floor(Math.random()* 16777215).toString(16)}`;
}

module.exports = {create , get , exists, remove};