import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { produtos } from '../data/produtos';
import { pegarCarrinho } from '../data/Carrinho';
import { useState, useEffect } from 'react';
import { registrarListener } from '../utils/CarrinhoListener';

export default function HomeScreen({ navigation }) {
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);

useEffect(() => {
  const carregarCarrinho = async () => {
    const itens = await pegarCarrinho();
    // Somar todas as quantidades
    const total = itens.reduce((acc, item) => acc + item.quantidade, 0);
    setQuantidadeCarrinho(total);
  };

  // Chama a função quando a tela abre
  carregarCarrinho();

  // Você pode adicionar um listener para quando voltar da tela de Produto
  const unsubscribe = navigation.addListener('focus', () => {
    carregarCarrinho();

    // Registrar listener para atualizar contador em tempo real
    registrarListener(async () => {
        const itens = await pegarCarrinho();
        const total = itens.reduce((acc, item) => acc + item.quantidade, 0);
        setQuantidadeCarrinho(total);
  });
  
  });

  return unsubscribe;
}, [navigation]);

  return (
    <View style={styles.container}>

      {/* Cabeçalho: título + botão do carrinho */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={styles.titulo}>Luxus Brechó 🛍️</Text>

        {/* Botão do carrinho */}
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
        <Text style={{ fontSize: 18 }}>
            Carrinho 🛒 ({quantidadeCarrinho})
        </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Produto', { produto: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8
  },
  nome: {
    fontSize: 16,
    marginTop: 8
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4
  }
});
