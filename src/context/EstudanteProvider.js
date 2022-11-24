import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(documentSnapshot => {
        let data = [];
        documentSnapshot.forEach(doc => {
          //console.log(doc.id, ' => ', doc.data());
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            curso: doc.data().curso,
            modulo: doc.data().modulo,
          });
        });
        setEstudantes(data);
        //console.log(data);
      });

    return () => subscriber();
  }, []);

  return (
    <EstudanteContext.Provider value={{estudantes}}>
      {children}
    </EstudanteContext.Provider>
  );
};
