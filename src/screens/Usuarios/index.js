import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {UsuarioContext} from '../../context/UsuarioProvider';

import {Container} from './styles';
import Item from './item';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';

const Usuarios = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {usuarios} = useContext(UsuarioContext);

  const routeUsuario = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {usuario: item},
      }),
    );
  };

  const routeAddUsuario = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Usuario',
        params: {usuario: null},
      }),
    );
  };

  return (
    <Container>
      {usuarios.map((v, k) => (
        <Item item={v} onPress={() => routeUsuario(v)} key={k} />
      ))}
      <AddFloatButton onClick={routeAddUsuario} />
      {loading && <Loading />}
    </Container>
  );
};
export default Usuarios;
