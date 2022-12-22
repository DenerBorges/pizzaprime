import React, {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const unsubscribe = firestore()
      .collection('usuarios')
      .orderBy('nome')
      .onSnapshot(
        documentSnapshot => {
          let data = [];
          documentSnapshot.forEach(doc => {
            //console.log(doc.id, ' => ', doc.data());
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
              idade: doc.data().idade,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            });
          });
          setUsuarios(data);
          //console.log(data);
        },
        e => {
          console.error('UsuarioProvider, getUsuario: ' + e);
        },
      );
    return () => unsubscribe();
  };

  const saveUsuario = async val => {
    await firestore()
      .collection('usuarios')
      .doc(val.uid)
      .set(
        {
          nome: val.nome,
          email: val.email,
          idade: val.idade,
        },
        {merge: true},
      )
      .then(() => {
        console.log('Dados salvos.');
      })
      .catch(e => {
        console.error('UsuarioProvider, saveUsuario: ' + e);
      });
  };

  const deleteUsuario = async val => {
    firestore()
      .collection('usuarios')
      .doc(val)
      .delete()
      .then(() => {
        console.log('Usuário excluído.');
      })
      .catch(e => {
        console.error('UsuarioProvider, deleteUsuario: ' + e);
      });
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        getUsuarios,
        setUsuarios,
        saveUsuario,
        deleteUsuario,
      }}>
      {children}
    </UsuarioContext.Provider>
  );
};
