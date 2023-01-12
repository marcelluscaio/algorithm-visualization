import troca from './troca.js';

function insertionSort(products) {  
  let movements = [];
  for (let atual = 0; atual < products.length; atual++) {
    let analise = atual;
    while (analise > 0 && products[analise].price < products[analise - 1].price) {
        movements.push(troca(products, analise));
        analise--;
    }
  }
  return movements;
}

export default insertionSort;

