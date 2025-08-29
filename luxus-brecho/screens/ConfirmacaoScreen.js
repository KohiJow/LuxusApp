import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConfirmacaoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mensagem}>✅ Pedido realizado com sucesso!</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotao}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  mensagem: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#CE3CFF', 
    marginBottom: 20 
  },
  botao: { 
    backgroundColor: '#CE3CFF', 
    padding: 12, 
    borderRadius: 8 
  },
  textoBotao: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});
