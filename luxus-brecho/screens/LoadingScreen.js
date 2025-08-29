import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#CE3CFF" />
      <Text style={styles.texto}>Carregando...</Text>
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
  texto: { 
    marginTop: 12, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#CE3CFF' 
  }
});
