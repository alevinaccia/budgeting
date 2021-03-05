Date.prototype.getWeek = (input) => {
    let firstOfYear = new Date(input.getFullYear(), 0 , 1);
    let numberOfDays = Math.floor((input - firstOfYear) / (24 * 60 * 60* 1000));
    return Math.ceil((input.getDay() + 1 + numberOfDays) / 7);
}