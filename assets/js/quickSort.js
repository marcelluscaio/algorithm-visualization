/* const listaLivros = require('./array'); */
//const trocaLugar = require('./encontraMenores');
import troca from './troca.js';

function quickSort(array, esquerda, direita) {
  console.log(array, esquerda, direita);
  if (array.length > 1) {
    let indiceAtual = particiona(array, esquerda, direita);
    if (esquerda < indiceAtual - 1) {
      quickSort(array, esquerda, indiceAtual - 1);
    }
    if (indiceAtual < direita) {
      quickSort(array, indiceAtual, direita)
    }
  }
  return array;
}

function particiona(array, esquerda, direita) {
  console.log('array', array)
  console.log('esquerda, direita', esquerda, direita)
  let pivo = array[Math.floor((esquerda + direita) / 2)]
  let atualEsquerda = esquerda; //0
  let atualDireita = direita; //10

  while (atualEsquerda <= atualDireita) {
    while (array[atualEsquerda].price < pivo.price) {
      atualEsquerda++
    }

    while (array[atualDireita].price > pivo.price) {
      atualDireita--
    }

    if (atualEsquerda <= atualDireita) {
      troca(array, atualEsquerda, atualDireita);
      atualEsquerda++;
      atualDireita--;
    }
  }
  return atualEsquerda;
}

//console.log(quickSort(listaLivros, 0, listaLivros.length - 1))
export default quickSort;


