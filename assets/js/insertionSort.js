import troca from './troca.js';

function insertionSort(products) {  
  
  for (let atual = 0; atual < products.length; atual++) {
    let analise = atual;
    while (analise > 0 && products[analise].price < products[analise - 1].price) {
        troca(products, analise);
        analise--;
    }
  }
}

export default insertionSort;

