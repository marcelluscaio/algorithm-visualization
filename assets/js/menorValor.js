function menorValor(arrProdutos, posicaoInicial) {
  let maisBarato = posicaoInicial;
  
  for (let atual = posicaoInicial; atual < arrProdutos.length; atual++) {
    if (arrProdutos[atual].price < arrProdutos[maisBarato].price) {
      maisBarato = atual
    }
  }
  return maisBarato;
}

export default menorValor;