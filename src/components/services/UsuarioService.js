import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth'; 

const usuarioService = {
  login: (email, password) => {
    return axios.post(`${BASE_URL}/login`, { email, password });
  },
  register: (usuario) => { // usuario es { email, password, role }
    return axios.post(`${BASE_URL}/register`, usuario);
  }
};

export default usuarioService;