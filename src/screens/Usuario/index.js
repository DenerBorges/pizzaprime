import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput, Text} from './styles';

import MyButton from '../../componentes/MyButton';
import DeleteButton from '../../componentes/DeleteButton';
import Loading from '../../componentes/Loading';
import {UsuarioContext} from '../../context/UsuarioProvider';

const Usuario = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveUsuario, deleteUsuario} = useContext(UsuarioContext);

  useEffect(() => {
    //console.log(route.params.usuario);
    setUid('');
    setNome('');
    setEmail('');
    setIdade('');
    if (route.params.usuario) {
      setUid(route.params.usuario.uid);
      setNome(route.params.usuario.nome);
      setEmail(route.params.usuario.email);
      setIdade(route.params.usuario.idade);
    }
    return () => {
      //console.log('desmontou Usuario');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && email && idade) {
      let usuario = {};
      usuario.uid = uid;
      usuario.nome = nome;
      usuario.email = email;
      usuario.idade = idade;
      setLoading(true);
      await saveUsuario(usuario);
      setLoading(false);
      ToastAndroid.show('Dados salvos.', ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o usuário?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteUsuario(uid);
          setLoading(false);
          ToastAndroid.show('Usuário excluído.', ToastAndroid.SHORT);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <Text>Usuário</Text>
      <TextInput
        placeholder="Nome do Usuário"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Email do Usuário"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        value={email}
      />
      <TextInput
        placeholder="Idade do Usuário"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setIdade(t)}
        value={idade}
      />
      <MyButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Usuario;
