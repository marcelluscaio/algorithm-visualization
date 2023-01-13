import menorValor from './menorValor.js';
//adicionar funcao troca. Reestruturar troca para isso

const selectionSort = (products) =>{
  let movementsSelection = []
  for (let atual = 0; atual < products.length - 1; atual++) {
    let menor = menorValor(products, atual);
    
    let produtoAtual = products[atual];
    let produtoMenorPreco = products[menor];

    products[atual] = produtoMenorPreco
    products[menor] = produtoAtual;
    movementsSelection.push([menor, atual]);
  }
  
  return movementsSelection;
}

export default selectionSort;