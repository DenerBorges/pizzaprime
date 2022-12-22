import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Usuarios from '../screens/Usuarios';
import Usuario from '../screens/Usuario';
import Pizzas from '../screens/Pizzas';
import Pizza from '../screens/Pizza';
import SingIn from '../screens/SingIn';
import SignUp from '../screens/SignUp';
import RecuperarSenha from '../screens/RecuperarSenha';
import Configuracao from '../screens/Configuracao';
import Localizacao from '../screens/Localizacao';
import Preload from '../screens/Preload';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SingIn" component={SingIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => (
    <Tab.Navigator
      initialRouteName="Usuarios"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          tabBarLabel: 'Usuários',
          tabBarIcon: () => (
            <Icon name="people" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarLabel: 'Usuário',
          tabBarIcon: () => (
            <Icon name="person-add" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Pizzas"
        component={Pizzas}
        options={{
          tabBarLabel: 'Pizzas',
          tabBarIcon: () => (
            <Icon name="pizza" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Pizza"
        component={Pizza}
        options={{
          tabBarLabel: 'Pedido',
          tabBarIcon: () => (
            <Icon name="cart" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Local"
        component={Localizacao}
        options={{
          tabBarLabel: 'Local',
          tabBarIcon: () => (
            <Icon name="location" color={COLORS.primary} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracao"
        component={Configuracao}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: () => (
            <Icon name="md-settings" color={COLORS.primary} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
