import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {UsuarioContext} from '../../context/UsuarioProvider';

import {Container, FlatList} from './styles';
import Item from './item';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';

const Usuarios = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {usuarios} = useContext(UsuarioContext);

  useEffect(() => {
    setData(usuarios);
    setLoading(false);
  }, [usuarios]);

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

  const renderItem = ({item}) => {
    <Item item={item} onPress={() => routeUsuario(item)} />;
  };

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddUsuario} />
      {loading && <Loading />}
    </Container>
  );
};
export default Usuarios;
