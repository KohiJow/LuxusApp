import AsyncStorage from '@react-native-async-storage/async-storage';

const CARRINHO_KEY = '@luxus_brecho_carrinho';

export async function pegarCarrinho() {
  try {
    const json = await AsyncStorage.getItem(CARRINHO_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.log("Erro ao pegar carrinho:", e);
    return [];
  }
}

export async function salvarCarrinho(itens) {
  try {
    await AsyncStorage.setItem(CARRINHO_KEY, JSON.stringify(itens));
  } catch (e) {
    console.log("Erro ao salvar carrinho:", e);
  }
}

export async function adicionarAoCarrinho(produto) {
  const carrinho = await pegarCarrinho();
  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index > -1) {
    // Se já existe, aumenta quantidade
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  await salvarCarrinho(carrinho);
  return carrinho;
}

export async function removerDoCarrinho(produtoId) {
  let carrinho = await pegarCarrinho();
  carrinho = carrinho.filter(item => item.id !== produtoId);
  await salvarCarrinho(carrinho);
  return carrinho;
}
