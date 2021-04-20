export default class transaction{
    constructor(value, category, message, period, type, budgetValue){
        this.type = type;
        this.value = value;
        this.category = category || null;
        this.message = message;
        this.period = period || null;
        this.budgetValue = budgetValue || null;
    }
}