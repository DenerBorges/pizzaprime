import React, {useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {Container, TextInput} from './styles';

import {PizzaContext} from '../../context/PizzaProvider';
import Loading from '../../componentes/Loading';
import MyButton from '../../componentes/MyButton';
import DeleteButton from '../../componentes/DeleteButton';

const Pizza = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [sabores, setSabores] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {savePizza, updatePizza, deletePizza} = useContext(PizzaContext);

  useEffect(() => {
    console.log(route.params);
    setNome('');
    setSabores('');
    setUid('');
    if (route.params !== undefined) {
      if (route.params.pizza) {
        setNome(route.params.pizza.nome);
        setSabores(route.params.pizza.sabores);
        setUid(route.params.pizza.uid);
      }
    }
    return () => {
      console.log('desmontou Pizza');
    };
  }, [route]);

  const salvar = async () => {
    if (nome && sabores) {
      let pizza = {};
      pizza.uid = uid;
      pizza.nome = nome;
      pizza.sabores = sabores;
      setLoading(true);
      if (uid) {
        await updatePizza(pizza);
      } else {
        await savePizza(pizza);
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja cancelar o pedido?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deletePizza(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome do Pedido"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Quantidade de sabores"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSabores(t)}
        value={sabores}
      />
      <MyButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Pizza;
