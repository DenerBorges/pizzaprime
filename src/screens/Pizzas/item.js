import React from 'react';
import styled from 'styled-components';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextNome = styled.Text`
  font-size: 19px;
  color: ${COLORS.white};
`;

const TextSabores = styled.Text`
  font-size: 17px;
  margin-top: 15px;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>Nome do Pedido: {item.nome}</TextNome>
        <TextSabores>Quantidade de Sabores: {item.sabores}</TextSabores>
      </>
    </Button>
  );
};
export default Item;
