/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import {Container, Image} from './styles';

import {UsuarioContext} from '../../context/UsuarioProvider';

const Preload = ({navigation}) => {
  const {getUsuarios} = useContext(UsuarioContext);

  const entrar = async (email, password) => {
    if (await signIn(email, password)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    }

    async function retrieveUserSession() {
      try {
        const session = await EncryptedStorage.getItem('user_session');

        if (session) {
          let localUser = JSON.parse(session);
          entrar(localUser.email, localUser.password);
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SingIn'}],
            }),
          );
        }
      } catch (error) {
        console.error('Preload, retrieveUserSession: ' + error);
      }
    }

    async function loginAutomatico() {
      await retrieveUserSession();
    }

    useEffect(() => {
      loginAutomatico();
      const unsubscribeUsuarios = getUsuarios();

      return () => {
        unsubscribeUsuarios;
      };
    }, []);

    return (
      <Container>
        <Image
          source={require('../../assets/images/logo.png')}
          accessibilityLabel="logo do app"
        />
      </Container>
    );
  };
};

export default Preload;
