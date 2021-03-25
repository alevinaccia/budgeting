export default class Interface {
    toggleEdit = (id) => {
      let div = document.getElementById(`${id}`);
      div.children[0].classList.toggle("display-none");
      div.children[1].classList.toggle("display-none");
      div.children[2].classList.toggle("display-none");
    };
  
    switchContainer = () => {
      container.style.background = "rgba(46 ,51 ,78, 0.3)";
      transactionsContainer.classList.toggle("display-none");
      formContainer.classList.toggle("display-none");
      container.classList.toggle("scroll-none");
    };
  }
  