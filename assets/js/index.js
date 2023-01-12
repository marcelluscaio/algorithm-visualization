import insertionSort from "./insertionSort.js";
import selectionSort from "./insertionSort.js";

let products = [];
const loader = document.querySelector(".lds-hourglass");
const productSection = document.querySelector(".products");
const botaoInsertion = document.querySelector("#insertion");
const botaoSelection = document.querySelector("#selection");
botaoInsertion.addEventListener("click", () => {
   moveItems(insertionSort(products));
   loader.style.display = "block";
   //renderItems();
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
   for(const child of productSection.children){
      child.style.transition = "transform .5s";
      child.setAttribute('data-position', 0)
   }
}

function moveItems(array){
   for(let i = 0; i < array.length; i++){
      delay(i, array)
   }
};

//create object position to be able to increase iteratively (100, 200, 300). ow max is 100%
function delay(i, array){
   loader.style.display = "none";
   
   setTimeout(() => {      
      //for(const child of productSection.children){child.style.transform = "translate(0px, 0px)"};
      productSection.children[array[i][0]].style.transform = `translate(-${array[i][0] - array[i][1]}00%, 20px)`;
      productSection.children[array[i][1]].style.transform = `translate(-${array[i][0] - array[i][1]}00%, 20px)`;      
      console.log(array[i]);
   }, 1000 * i)
}

getItems();