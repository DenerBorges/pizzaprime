import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
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

export const Image = styled.Image`
  width: 120px;
  height: 120px;
  margin: 5px;
  margin-bottom: 15px;
`;
