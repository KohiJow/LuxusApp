import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { pegarCarrinho, atualizarQuantidade } from '../data/Carrinho';

export default function CarrinhoScreen() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  const carregarCarrinho = async () => {
    const itens = await pegarCarrinho();
    setItensCarrinho(itens);

    const totalGeral = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    setTotal(totalGeral);
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const alterarQuantidade = async (id, novaQtd) => {
    if (novaQtd < 1) return; // não deixa quantidade menor que 1
    await atualizarQuantidade(id, novaQtd);
    carregarCarrinho();
  };

  const finalizarPedido = () => {
    if (itensCarrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione pelo menos 1 produto para finalizar.');
      return;
    }

    let mensagem = 'Olá, gostaria de fazer o pedido:\n';
    itensCarrinho.forEach(item => {
      mensagem += `${item.titulo} - ${item.quantidade} x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    mensagem += `Total: R$${total.toFixed(2)}`;

    // Abre WhatsApp
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itensCarrinho}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
            <View style={styles.qtdContainer}>
              <TouchableOpacity onPress={() => alterarQuantidade(item.id, item.quantidade - 1)}>
                <Text style={styles.qtdBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtd}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => alterarQuantidade(item.id, item.quantidade + 1)}>
                <Text style={styles.qtdBtn}>+</Text>
              </TouchableOpacity>
            </View>
            <Text>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarPedido}>
        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 12 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  qtdContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  qtdBtn: { fontSize: 20, paddingHorizontal: 12 },
  qtd: { fontSize: 16, marginHorizontal: 8 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  botaoFinalizar: { backgroundColor: '#CE3CFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
