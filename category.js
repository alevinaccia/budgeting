export default class Category{
    constructor(name,color, creatorId, budget){
        this.name = name;
        this.color = color;
        this.creatorId = creatorId;
        this.budget = budget || false;
    }
}