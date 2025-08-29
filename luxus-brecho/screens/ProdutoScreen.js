import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { adicionarAoCarrinho } from '../data/Carrinho';
import { avisarMudanca } from '../utils/CarrinhoListener';
import { pegarFavoritos, salvarFavorito } from '../data/Favoritos'; // Vamos criar depois

export default function ProdutoScreen({ route }) {
  const { produto } = route.params;
  const [favorito, setFavorito] = useState(false);

  // Carregar estado do favorito ao abrir
  useEffect(() => {
    const carregarFavorito = async () => {
      const favoritos = await pegarFavoritos();
      setFavorito(favoritos.some(item => item.id === produto.id));
    };
    carregarFavorito();
  }, []);

  const adicionarCarrinho = async () => {
    await adicionarAoCarrinho(produto);

    // Atualiza contador na Home
    avisarMudanca();

    Alert.alert("Carrinho", `${produto.titulo} adicionado ao carrinho!`);
  };

  const alternarFavorito = async () => {
    await salvarFavorito(produto);
    setFavorito(!favorito);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />

      <Text style={styles.nome}>{produto.titulo}</Text>
      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      <Text style={styles.descricao}>{produto.descricao}</Text>

      <TouchableOpacity style={styles.botao} onPress={adicionarCarrinho}>
        <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoFavorito} onPress={alternarFavorito}>
        <Text style={{ fontSize: 18 }}>{favorito ? '❤️ Favorito' : '🤍 Favorito'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  imagem: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  descricao: {
    fontSize: 16,
    marginBottom: 16
  },
  botao: {
    backgroundColor: '#CE3CFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  botaoFavorito: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CE3CFF'
  }
});
