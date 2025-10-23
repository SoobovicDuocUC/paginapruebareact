// jest.setup.js

import { TextEncoder, TextDecoder } from 'util';

// Cambia 'global' por 'globalThis'
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

// El resto de tu archivo queda igual
import '@testing-library/jest-dom';