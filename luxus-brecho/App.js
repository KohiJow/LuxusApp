import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando todas as telas
import HomeScreen from './screens/HomeScreen';
import ProdutoScreen from './screens/ProdutoScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import FinalizacaoScreen from './screens/FinalizacaoScreen';
import ConfirmacaoScreen from './screens/ConfirmacaoScreen';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Produto" component={ProdutoScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Finalizacao" component={FinalizacaoScreen} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
