import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/productos';

const productoService = {
  
  getAllProductos: () => {
    return axios.get(BASE_URL);
  },
  
  getProductoById: (id) => {
    return axios.get(`${BASE_URL}/${id}`);
  },
  
  getProductosByCategoria: (categoria) => {
    return axios.get(`${BASE_URL}/categoria/${categoria}`);
  },
  
  createProducto: (producto) => {
    return axios.post(BASE_URL, producto);
  },
  
  updateProducto: (id, producto) => {
    return axios.put(`${BASE_URL}/${id}`, producto);
  },
  
  deleteProducto: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};

export default productoService;