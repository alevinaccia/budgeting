export default class Category{
    constructor(name,color, creatorId, budget, budgetValue = 0, budgetPeriod = null){
        this.name = name;
        this.color = color;
        this.creatorId = creatorId;
        this.budget = budget || false;
        this.budgetValue = budgetValue;
        this.budgetPeriod = budgetPeriod;
    }
}