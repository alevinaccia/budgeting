const main = document.getElementById('main');
main.addEventListener('click', () => {
    if(!main.classList.contains('selected')){
        window.location.href = '../main-page/index.html';
    }
})

const savings = document.getElementById('savings');
savings.addEventListener('click', () => {
    if(!savings.classList.contains('selected')){
        window.location.href = '../savings-page/index.html';
    }
})

const budget = document.getElementById('budget');
budget.addEventListener('click', () => {
    if(!budget.classList.contains('selected')){
        window.location.href = '../budget-page/index.html';
    }
})

const settings = document.getElementById('settings');
settings.addEventListener('click', () => {
    if(!settings.classList.contains('selected')){
        window.location.href = '../settings-page/index.html';
    }
})