import React, {useState} from 'react';
import {Alert} from 'react-native';
import MyButton from '../../componentes/MyButton';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          let userF = auth().currentUser;
          userF
            .sendEmailVerification()
            .then(() => {
              Alert.alert(
                'Informação',
                'Foi enviado um email para: ' + email + ' para verificação.',
              );
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SingIn'}],
                }),
              );
            })
            .catch(e => {
              console.error('SignUp, cadastrar: ' + e);
            });
        })
        .catch(e => {
          console.error('SignUp, cadastrar: ' + e);
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
        });
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
        onEndEditing={() => this.ConfirmPassTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.ConfirmPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setConfirmPass(t)}
        onEndEditing={() => cadastrar()}
      />
      <MyButton texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
