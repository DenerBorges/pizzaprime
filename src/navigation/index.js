import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {UsuarioProvider} from '../context/UsuarioProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UsuarioProvider>
        <Navigator />
      </UsuarioProvider>
    </AuthUserProvider>
  );
}
