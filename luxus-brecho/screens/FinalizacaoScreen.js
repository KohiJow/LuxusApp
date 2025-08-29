import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { pegarCarrinho } from '../data/Carrinho';

export default function FinalizacaoScreen() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [nomeCliente, setNomeCliente] = useState('');
  const [observacoes, setObservacoes] = useState('');
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

  const enviarPedido = () => {
    if (itensCarrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione pelo menos 1 produto para finalizar.');
      return;
    }
    if (!nomeCliente.trim()) {
      Alert.alert('Nome obrigatório', 'Digite seu nome para finalizar o pedido.');
      return;
    }

    let mensagem = `Olá, meu nome é ${nomeCliente}.\nQuero fazer o pedido:\n`;
    itensCarrinho.forEach(item => {
      mensagem += `${item.titulo} - ${item.quantidade} x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    if (observacoes.trim()) {
      mensagem += `Observações: ${observacoes}\n`;
    }
    mensagem += `Total: R$${total.toFixed(2)}`;

    const url = `https://wa.me/5519994563656?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      <FlatList
        data={itensCarrinho}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Seu nome"
        style={styles.input}
        value={nomeCliente}
        onChangeText={setNomeCliente}
      />

      <TextInput
        placeholder="Observações (opcional)"
        style={[styles.input, { height: 80 }]}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botao} onPress={enviarPedido}>
        <Text style={styles.textoBotao}>Enviar Pedido via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 8 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginVertical: 8 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  botao: { backgroundColor: '#CE3CFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
