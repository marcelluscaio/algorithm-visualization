import insertionSort from "./insertionSort.js";
import selectionSort from "./selectionSort.js";
import mergeSort from "./mergeSort.js";

let products = [];
const loader = document.querySelector(".lds-hourglass");
const productSection = document.querySelector(".products");
const buttonDiv = document.querySelector('div:has(button + button)')
const botaoInsertion = document.querySelector("#insertion");
const botaoSelection = document.querySelector("#selection");
const botaoMerge = document.querySelector("#merge");
botaoInsertion.addEventListener("click", () => {
   moveItems(insertionSort(products));
});

botaoSelection.addEventListener("click", () => {
   moveItems(selectionSort(products));
});

botaoMerge.addEventListener("click", () => {
   moveItems(mergeSort(products));
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
      child.setAttribute('data-displacement', 0);
      child.setAttribute('data-arrayposition', arrayPosition);
      arrayPosition++;
   }
}

function moveItems(array){
   //console.log(array);
   for(let i = 0; i < array.length; i++){
      delay(i, array[i])
   }
};

function delay(i, array){
   loader.style.display = "none";
   
   
   setTimeout(() => {
      console.log(array);
      const smaller = [...productSection.children].filter(item => item.dataset.arrayposition == array[0])[0];
      console.log(smaller);
      const bigger = [...productSection.children].filter(item => item.dataset.arrayposition == array[1])[0];
      const smallerPosition = smaller.dataset.arrayposition;
      const biggerPosition = bigger.dataset.arrayposition;
      const displacement = parseInt(smallerPosition) - parseInt(biggerPosition);
   
      smaller.dataset.arrayposition = biggerPosition;
      bigger.dataset.arrayposition = smallerPosition;
      smaller.dataset.displacement = parseInt(smaller.dataset.displacement) - displacement;
      bigger.dataset.displacement = parseInt(bigger.dataset.displacement) + displacement;
      smaller.style.setProperty("--displacement", `${smaller.dataset.displacement * 112}%`);
      bigger.style.setProperty("--displacement", `${bigger.dataset.displacement * 112}%`);
      //bigger.style.transform = `translateX(${bigger.dataset.displacement * 100}%)`;
      //smaller.style.transform = `translateX(${smaller.dataset.displacement * 100}%)`; 



      /*
      element1.dataset.position = parseInt(element1.dataset.position) + parseInt(arrayPosition1) - parseInt(arrayPosition0);
      element0.dataset.position = parseInt(element0.dataset.position) + parseInt(arrayPosition0) - parseInt(arrayPosition1);

      element1.style.transform = `translate(${element1.dataset.position * 110}%, 0px)`;
      element0.style.transform = `translate(${element0.dataset.position * 110}%, 0px)`; */
   }, 2000 * i)
}

getItems();