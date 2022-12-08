import React from 'react';
import {Container, Text, Image} from './styles';
import MyButton from '../../componentes/MyButton';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const Perfil = ({navigation}) => {
  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (error) {}
  }

  const SignOut = async () => {
    await removeUserSession();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  };

  return (
    <Container>
      <Text>Perfil</Text>
      <Image
        source={require('../../assets/images/perfil.png')}
        accessibilityLabel="perfil do usuario"
      />
      <Text>Nome: "Nome do Usuário"</Text>
      <Text>Email: "Email do Usuário"</Text>
      <MyButton texto="Sair" onClick={SignOut} />
    </Container>
  );
};

export default Perfil;
