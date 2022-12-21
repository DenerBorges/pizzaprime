/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Container} from './styles';

import {PizzaContext} from '../../context/PizzaProvider';

const Pizzas = () => {
  const {getPizzas} = useContext(PizzaContext);

  const fetchData = async () => {
    await getPizzas();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Container />;
};

export default Pizzas;
