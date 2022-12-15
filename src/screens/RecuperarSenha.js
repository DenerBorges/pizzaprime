import React, {useContext, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import {COLORS} from '../assets/colors';
import {AuthUserContext} from '../context/AuthUserProvider';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {recoverPass} = useContext(AuthUserContext);

  const recover = async () => {
    if (email !== '') {
      if (await recoverPass(email)) {
        Alert.alert(
          'Atenção',
          'Enviamos um email de recuperação para o seguinte endereço' + email,
          [{text: 'Ok', onPress: () => navigation.goBack()}],
        );
      }
    } else {
      Alert.alert('Atenção', 'Preencha o campo com um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recuperar Senha</Text>
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
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    color: COLORS.primary,
    padding: 20,
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
