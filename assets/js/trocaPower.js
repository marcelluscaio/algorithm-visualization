function trocaPower(lista, analise1, analise2) {
  
  let itemAnalise = lista[analise1];
  let itemAnterior = lista[analise2];
  lista[analise1] = itemAnterior;
  lista[analise2] = itemAnalise;
  return [analise1, analise2]
}

export default trocaPower;