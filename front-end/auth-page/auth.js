const form = document.querySelector(".main-form");
//Fields
const user = form.username;
const pass = form.password;
const loginBTN = form.btn;
//API
const URL = "http://127.0.0.1:3000"

loginBTN.addEventListener("click", () => {
    fetch(URL + '/login', {
        method:"POST",
        headers : {
            username : user.value,
            password : pass.value
        }
    }).then(res => res.json()).then(data => {
        if(data.message == 'succesfull!'){
            window.location = '../main/index.html'
        }else{
            console.log(data.message);
        }
    });
});