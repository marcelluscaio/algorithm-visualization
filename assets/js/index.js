import insertionSort from "./insertionSort.js";
import selectionSort from "./selectionSort.js";

let products = [];
const loader = document.querySelector(".lds-hourglass");
const productSection = document.querySelector(".products");
const buttonDiv = document.querySelector('div:has(button + button)')
const botaoInsertion = document.querySelector("#insertion");
const botaoSelection = document.querySelector("#selection");
botaoInsertion.addEventListener("click", () => {
   moveItems(insertionSort(products));
});

botaoSelection.addEventListener("click", () => {
   moveItems(selectionSort(products));
});

async function getItems(){
   let result = await fetch('https://fakestoreapi.com/products');
   let jsonResult = await result.json();
   products = jsonResult.slice(0, 8);
   renderItems();   
}

function renderItems(){
   productSection.innerHTML="";
   buttonDiv.style.display="flex"
   products.map( product => 
      {
         let element = `<div><p>${product.title}</p><p>${product.price}</p><img src=${product.image}></div>`
         productSection.innerHTML += element;
      }   
   );
   loader.style.display = "none";
   let arrayPosition = 0;
   for(const child of productSection.children){
      child.style.transition = "transform .5s";
      child.setAttribute('data-position', 0);
      child.setAttribute('data-arrayposition', arrayPosition);
      arrayPosition++;
   }
}

function moveItems(array){
   console.log(array);
   for(let i = 0; i < array.length; i++){
      delay(i, array)
   }
};

//testar com numeros maiores (10 itens)
function delay(i, array){
   loader.style.display = "none";
   
   setTimeout(() => {
      let arrayPosition0 = productSection.children[array[i][0]].dataset.arrayposition;
      let arrayPosition1 = productSection.children[array[i][1]].dataset.arrayposition;
      productSection.children[array[i][0]].dataset.arrayposition = arrayPosition1;
      productSection.children[array[i][1]].dataset.arrayposition = arrayPosition0;
      
      let element1 = document.querySelector(`[data-arrayPosition='${arrayPosition1}']`);
      let element0 = document.querySelector(`[data-arrayPosition='${arrayPosition0}']`);

      element1.dataset.position = parseInt(element1.dataset.position) + parseInt(arrayPosition1) - parseInt(arrayPosition0);
      element0.dataset.position = parseInt(element0.dataset.position) + parseInt(arrayPosition0) - parseInt(arrayPosition1);

      element1.style.transform = `translate(${element1.dataset.position * 110}%, 0px)`;
      element0.style.transform = `translate(${element0.dataset.position * 110}%, 0px)`;
   }, 1000 * i)
}

getItems();