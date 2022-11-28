import React from 'react';
import {UsuarioProvider} from '../context/UsuarioProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <UsuarioProvider>
      <Navigator />
    </UsuarioProvider>
  );
}
