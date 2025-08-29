import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProdutoScreen from '../screens/ProdutoScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import FinalizacaoScreen from '../screens/FinalizacaoScreen';
import ConfirmacaoScreen from '../screens/ConfirmacaoScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Produto" component={ProdutoScreen} />
      <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
      <Stack.Screen name="Finalizacao" component={FinalizacaoScreen} />
      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
    </Stack.Navigator>
  );
}
