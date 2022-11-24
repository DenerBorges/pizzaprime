import React from 'react';
import {EstudanteProvider} from '../context/EstudanteProvider';
import Navigator from './navigator';

export default function Providers() {
  return (
    <EstudanteProvider>
      <Navigator />
    </EstudanteProvider>
  );
}
