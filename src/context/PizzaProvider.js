import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const PizzaContext = createContext({});

export const PizzaProvider = ({children}) => {
  const [pizza, setPizza] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getPizza = async () => {
    try {
      const response = await api.get('/pizza');
      console.log('Dados buscados via API');
      console.log(response);
      console.log(response.data);
    } catch (response) {
      console.log('Erro ao buscar via API');
      console.log(response);
    }
  };

  const savePizza = () => {};

  const updatePizza = () => {};

  const deletePizza = () => {};

  return (
    <PizzaContext.Provider
      value={{
        pizza,
        getPizza,
        savePizza,
        updatePizza,
        deletePizza,
      }}>
      {children}
    </PizzaContext.Provider>
  );
};
