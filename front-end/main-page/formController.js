const container = document.querySelector(".container");
const valueInput = document.querySelector(".valueInput");
const recursive = document.querySelector(".recursiveBox");
const category = document.querySelector(".category-list");
const categoryList = document.getElementById("category-list");
const message = document.querySelector(".text");
const switchElement = document.querySelector(".slider");
const ammountToSave = document.querySelector(".ammountToSave");


export default class FormController {
  //form reset
  clearForm(){
    //Switch
    switchElement.checked = true;
    container.style.background = "rgba(0 ,255 ,0, 0.4)";
    //Value
    valueInput.value = 0;
    valueInput.style.border = "";
    //Message
    message.value = "";
    message.style.border = "";
    //Checkbok
    recursive.checked = false;
    //AmmountToSave
    document.querySelector(".max").textContent = "100";
    ammountToSave.value = 0;
    //Category
    category.value = "";
  };

  //inizializes the datases
  createCategories(list){
    const array = Array.from(list);
    array.forEach((cat) => {
      this.addCategory(cat);
    });
  };

  //add categories to the dataset
  addCategory(cat){
    const option = document.createElement("option");
    option.setAttribute("value", cat.name);
    categoryList.appendChild(option);
  };
}
