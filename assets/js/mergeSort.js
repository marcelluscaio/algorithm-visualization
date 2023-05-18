//const listaLivros = require('./array');

const trocas = [];

function mergeSort(array, nivelAninhamento = 0) {

  console.log(`nível de aninhamento: ${nivelAninhamento}`)
  console.log(array)

  if(array.length > 1) {
    const meio = Math.floor(array.length / 2);
    const parte1 = mergeSort(array.slice(0, meio), nivelAninhamento + 1);
    const parte2 = mergeSort(array.slice(meio, array.length), nivelAninhamento + 1);
    array = ordena(parte1, parte2);
  }

  if(nivelAninhamento === 0){
    return trocas;
  }
  return array;
}


function ordena(parte1, parte2) {
  let posicaoAtualParte1 = 0 
  let posicaoAtualParte2 = 0
  const resultado = [];
  

  while (posicaoAtualParte1 < parte1.length && posicaoAtualParte2 < parte2.length) {
    let produtoAtualParte1 = parte1[posicaoAtualParte1];
    let produtoAtualParte2 = parte2[posicaoAtualParte2];

    trocas.push([produtoAtualParte1.id-1, produtoAtualParte2.id-1])
    //const idStorage = produtoAtualParte1.id;
    //produtoAtualParte1.id = produtoAtualParte2.id;
    //produtoAtualParte2.id = idStorage;


    if (produtoAtualParte1.price < produtoAtualParte2.price) {
      resultado.push(produtoAtualParte1)
      posicaoAtualParte1++
    } else {
      resultado.push(produtoAtualParte2)
      posicaoAtualParte2++
    }
  }
  //resultado no model
  console.log('ordena:', resultado.concat(posicaoAtualParte1 < parte1.length
    ? parte1.slice(posicaoAtualParte1)
    : parte2.slice(posicaoAtualParte2)));

  return resultado.concat(posicaoAtualParte1 < parte1.length
    ? parte1.slice(posicaoAtualParte1)
    : parte2.slice(posicaoAtualParte2))
}

//console.log(mergeSort(listaLivros));

export default mergeSort;