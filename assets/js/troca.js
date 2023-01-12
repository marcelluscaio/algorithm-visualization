function troca(lista, analise) {
  
  let itemAnalise = lista[analise];
  let itemAnterior = lista[analise - 1];
  console.log(`Troquei ${lista[analise].title} por ${lista[analise - 1].title}`);
  lista[analise] = itemAnterior;
  lista[analise - 1] = itemAnalise;
  return [analise, analise - 1]
}

export default troca;