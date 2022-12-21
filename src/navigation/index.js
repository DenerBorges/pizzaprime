import React from 'react';
import {ApiProvider} from '../context/ApiProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PizzaProvider} from '../context/PizzaProvider';
import {UsuarioProvider} from '../context/UsuarioProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UsuarioProvider>
          <PizzaProvider>
            <Navigator />
          </PizzaProvider>
        </UsuarioProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
