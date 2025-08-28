import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { produtos } from '../data/produtos';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Luxus Brechó 🛍️</Text>

      <FlatList  //FlatList mostra uma lista de produtos.
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
          </View>
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
    fontWeight: 'bold',
    marginBottom: 16
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
