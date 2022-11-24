import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {EstudanteContext} from '../../context/EstudanteProvider';

const Estudantes = () => {
  const [data, setData] = useState([]);
  const {estudantes} = useContext(EstudanteContext);

  useEffect(() => {
    console.log(estudantes);
    setData(estudantes);
  }, [estudantes]);

  return (
    <View>
      <Text style={styles.texto}>Estudantes</Text>
    </View>
  );
};
export default Estudantes;

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
  },
});
