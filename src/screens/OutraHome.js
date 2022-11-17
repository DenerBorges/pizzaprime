import React from 'react';
import {View, Text} from 'react-native';
import MyButton from '../componentes/MyButton';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const OutraHome = ({navigation}) => {
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
    <View>
      <Text>OutraHome</Text>
      <MyButton texto="Sair" onClick={SignOut} />
    </View>
  );
};

export default OutraHome;
