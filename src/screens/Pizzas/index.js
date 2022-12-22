/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Container, FlatList} from './styles';
import Item from './item';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../componentes/Loading';
import AddFloatButton from '../../componentes/AddFloatButton';

import {PizzaContext} from '../../context/PizzaProvider';

const Pizzas = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getPizzas, pizzas} = useContext(PizzaContext);

  const fetchData = async () => {
    try {
      await getPizzas();
    } catch (error) {
      console.log('Pizzas, fetchData' + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(pizzas);
  }, [pizzas]);

  const routePizza = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Pizza',
        params: {pizza: item},
      }),
    );
  };

  const routeAddPizza = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Pizza',
        params: {pizza: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routePizza(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddPizza} />
      {loading && <Loading />}
    </Container>
  );
};

export default Pizzas;
