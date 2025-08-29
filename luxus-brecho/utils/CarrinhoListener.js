// utils/CarrinhoListener.js
let callback = null;

// Registrar quem quer ouvir mudanças
export function registrarListener(fn) {
  callback = fn;
}

// Avisar que o carrinho mudou
export function avisarMudanca() {
  if (callback) {
    callback();
  }
}
