import insertionSort from "./insertionSort.js";
import selectionSort from "./insertionSort.js";

let products = [];
const loader = document.querySelector(".lds-hourglass");
const productSection = document.querySelector(".products");
const botaoInsertion = document.querySelector("#insertion");
const botaoSelection = document.querySelector("#selection");
botaoInsertion.addEventListener("click", () => {
   insertionSort(products);
   loader.style.display = "block";
   renderItems();
});
botaoSelection.addEventListener("click", () => {
   selectionSort(products);
   loader.style.display = "block";
   renderItems();
});

async function getItems(){
   let result = await fetch('https://fakestoreapi.com/products');
   let jsonResult = await result.json();
   products = jsonResult.slice(0, 6);
   renderItems();   
}

function renderItems(){
   productSection.innerHTML="";
   products.map( product => 
      {
         let element = `<div><p>${product.title}</p><p>${product.price}</p><img src=${product.image}></div>`
         productSection.innerHTML += element;
      }   
   );
   loader.style.display = "none";
}

getItems();