import React from 'react';
import {Text} from './styles';

const Item = ({item}) => {
  return (
    <>
      <Text>Nome: {item.nome}</Text>
      <Text>Email: {item.email}</Text>
    </>
  );
};
export default Item;
