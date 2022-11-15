import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import MyButton from '../componentes/MyButton';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação para o seguinte endereço' + email,
            [{text: 'Ok', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.error('RecuperarSenha, recover: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Atenção', 'Preencha o campo com um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButton texto="Recuperar" onClick={recover} />
    </View>
  );
};
export default RecuperarSenha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
  },
});
