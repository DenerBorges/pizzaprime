import React, {createContext} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  async function storeUserSession(localUser) {
    try {
      await EncryptedStorage.setItem('user_session', JSON.stringify(localUser));
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  const signUp = async (email, pass) => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      let userF = auth().currentUser;
      userF.sendEmailVerification().then(() => {
        Alert.alert(
          'Informação',
          'Foi enviado um email para: ' + email + ' para verificação.',
        );
      });
    } catch (e) {
      console.error('AuthUserProvider, signUp: ' + e);
      switch (e.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Erro', 'Email já está em uso.');
          break;
        case 'auth/operation-not-allowed':
          Alert.alert('Erro', 'Problema em cadastrar o usuário.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/weak-password':
          Alert.alert(
            'Erro',
            'Senha fraca, por favor utilizar uma senha forte.',
          );
          break;
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      if (!auth().currentUser.emailVerified) {
        Alert.alert(
          'Erro',
          'Você deve verificar o seu email para confirmar o cadastro.',
        );
        return false;
      }
      await storeUserSession({
        email,
        password,
      });
      return true;
    } catch (e) {
      console.error('AuthUserProvider, signIn: ' + e);
      switch (e.code) {
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Usuário não cadastrado.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Erro', 'Erro na senha.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/user-disabled':
          Alert.alert('Erro', 'Usuário desabilitado.');
          break;
      }
      return false;
    }
  };

  const signOut = async () => {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (e) {
      console.error('AuthUserProvider, signOut' + e);
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
