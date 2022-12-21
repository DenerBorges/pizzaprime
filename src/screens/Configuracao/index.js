import React, {useContext} from 'react';
import {Container, Text, Image} from './styles';
import Item from './item';
import MyButton from '../../componentes/MyButton';
import {CommonActions} from '@react-navigation/native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {UsuarioContext} from '../../context/UsuarioProvider';

const Configuracao = ({navigation, item}) => {
  const {signOut} = useContext(AuthUserContext);
  const {usuarios} = useContext(UsuarioContext);

  const SignOut = async () => {
    if (await signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    }
  };

  return (
    <Container>
      <Text>Perfil</Text>
      <Image
        source={require('../../assets/images/perfil.png')}
        accessibilityLabel="perfil do usuario"
      />
      {usuarios.map((v, k) => (
        <Item item={v} key={k} />
      ))}
      <MyButton texto="Sair" onClick={SignOut} />
    </Container>
  );
};

export default Configuracao;
