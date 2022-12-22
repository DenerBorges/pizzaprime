import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const PizzaContext = createContext({});

export const PizzaProvider = ({children}) => {
  const [pizzas, setPizzas] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getPizzas = async () => {
    try {
      const response = await api.get('/pizza');
      // console.log('Dados buscados via API');
      // console.log(response);
      // console.log(response.data.documents);
      let data = [];
      // console.log(response.data.documents[0].fields);
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pizzaprime-1ed62/databases/(default)/documents/pizza/',
        );
        data.push({
          nome: d.fields.nome.stringValue,
          sabores: d.fields.sabores.integerValue,
          uid: k[1],
        });
      });
      // console.log(data);
      data.sort((a, b) => a.nome.localeCompare(b.nome));
      setPizzas(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API');
      console.log(response);
    }
  };

  const savePizza = async val => {
    try {
      await api.post('/pizza/', {
        fields: {
          nome: {stringValue: val.nome},
          sabores: {integerValue: val.sabores},
        },
      });
      showToast('Dados salvos.');
      getPizzas();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao savePizza via API.');
      console.log(response);
    }
  };

  const updatePizza = async val => {
    try {
      await api.patch('/pizza/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          sabores: {integerValue: val.sabores},
        },
      });
      showToast('Dados salvos');
      getPizzas();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updatePizza via API.');
      console.log(response);
    }
  };

  const deletePizza = async val => {
    try {
      await api.delete('/pizza/' + val);
      getPizzas();
      showToast('Pedido excluído.');
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deletePizza via API.');
      console.log(response);
    }
  };

  return (
    <PizzaContext.Provider
      value={{
        pizzas,
        getPizzas,
        savePizza,
        updatePizza,
        deletePizza,
      }}>
      {children}
    </PizzaContext.Provider>
  );
};
