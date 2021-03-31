export default class transaction{
    constructor(value, category, message, period, ammountToSave, type, budgetValue){
        this.type = type;
        this.value = value;
        this.category = category || null;
        this.message = message;
        this.period = period || null;
        this.ammountToSave = ammountToSave || 0;
        this.budgetValue = budgetValue || null;
    }
}