import menorValor from './menorValor.js';
import troca from './troca.js'; //adicionar. Reestruturar troca para isso

const selectionSort = (products) =>{
  
  for (let atual = 0; atual < products.length - 1; atual++) {
    let menor = menorValor(products, atual);
    
    let livroAtual = livros[atual];
    let livroMenorPreco = livros[menor];

    livros[atual] = livroMenorPreco
    livros[menor] = livroAtual
  }
}

export default selectionSort;