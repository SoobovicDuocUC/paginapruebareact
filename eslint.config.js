// eslint.config.js

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import jest from 'eslint-plugin-jest'; // 1. Importa el plugin de Jest

export default [
  // Configuraciones generales para todo el proyecto
  {
    files: ['src/**/*.{js,jsx}'], // Aplica a todos los archivos JS/JSX en la carpeta src
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser, // Habilita variables globales del navegador como 'window'
    },
  },

  // Reglas recomendadas de ESLint y React
  pluginJs.configs.recommended,
  pluginReactConfig,

  // --- SECCIÓN CORREGIDA Y AÑADIDA PARA JEST ---
  {
    // Esta sección se aplica SÓLO a tus archivos de prueba
    files: ['src/**/*.test.jsx', 'src/**/*.test.js'],
    ...jest.configs['flat/recommended'], // 2. Aplica todas las reglas recomendadas de Jest
    languageOptions: {
      globals: {
        ...globals.jest, // 3. Habilita las variables globales de Jest ('describe', 'test', 'expect', etc.)
      },
    },
  },
];