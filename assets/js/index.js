import insertionSort from "./insertionSort.js";
import selectionSort from "./selectionSort.js";
import mergeSort from "./mergeSort.js";
import quickSort from "./quickSort.js";

let products = [];
const loader = document.querySelector(".lds-hourglass");
const productSection = document.querySelector(".products");
const buttonDiv = document.querySelector('div:has(button + button)')
const botaoInsertion = document.querySelector("#insertion");
const botaoSelection = document.querySelector("#selection");
const botaoQuick = document.querySelector("#quick");
const botaoReset = document.querySelector("#reset");
/* const botaoMerge = document.querySelector("#merge"); */

botaoInsertion.addEventListener("click", () => {
   moveItems(insertionSort(products));
});

botaoSelection.addEventListener("click", () => {
   moveItems(selectionSort(products));
});

botaoQuick.addEventListener("click", () => {
   moveItems(quickSort(products, 0, products.length -1));
});

botaoReset.addEventListener("click", () => {
   getItems();
   renderItems();
});

/* botaoMerge.addEventListener("click", () => {
   moveItemsMerge(mergeSort(products));
}); */

async function getItems(){
   let result = await fetch('https://fakestoreapi.com/products');
   let jsonResult = await result.json();
   products = jsonResult.slice(0, 8);
   renderItems();
   //console.log(quickSort(products, 0, products.length -1));
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
   console.log(array);
   for(let i = 0; i < array.length; i++){
      delay(i, array[i])
   }
};

function delay(i, array){
   loader.style.display = "none";
   
   
   setTimeout(() => {
      //console.log(array);
      const smaller = [...productSection.children].filter(item => item.dataset.arrayposition == array[0])[0];
      //console.log(smaller);
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

   }, 2000 * i);
};

function moveItemsMerge(array){
/*    console.log(array);
   const newArray = [];
   array.forEach((item, index) => {
      index % 2 === 0 ? newArray.push([item]) : newArray[Math.floor(index/2)].push(item);
      
   });
   console.log(newArray) */
   for(let i = 0; i < array.length; i++){
      delayMerge(i, array[i]);
   } 
};

function delayMerge(i, position){
   loader.style.display = "none";
   
   
   setTimeout(() => {
      //console.log(array);
      const product = [...productSection.children].filter(item => item.dataset.arrayposition == position)[0];
      /* product.dataset.displacement++;
      product.style.setProperty("--displacementY", `${product.dataset.displacement * 100}}%`) */
      /* const smaller = [...productSection.children].filter(item => item.dataset.arrayposition == array[0])[0];
      //console.log(smaller);
      const bigger = [...productSection.children].filter(item => item.dataset.arrayposition == array[1])[0];
      const smallerPosition = smaller.dataset.arrayposition;
      const biggerPosition = bigger.dataset.arrayposition;
      const displacement = parseInt(smallerPosition) - parseInt(biggerPosition);
   
      smaller.dataset.arrayposition = biggerPosition;
      bigger.dataset.arrayposition = smallerPosition;
      smaller.dataset.displacement = parseInt(smaller.dataset.displacement) - displacement;
      bigger.dataset.displacement = parseInt(bigger.dataset.displacement) + displacement;
      smaller.style.setProperty("--displacement", `${smaller.dataset.displacement * 112}%`);
      bigger.style.setProperty("--displacement", `${bigger.dataset.displacement * 112}%`); */

   }, 2000 * i);
};

getItems();

