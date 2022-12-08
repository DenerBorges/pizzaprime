import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Text = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  font-family: Verdana;
  color: ${COLORS.primary};
  padding: 20px;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;
