import { Routes, Route } from 'react-router-dom';
import Header from "./components/organisms/Header.jsx";
import Footer from "./components/organisms/Footer.jsx";
import Home from "./components/pages/Home.jsx";
import Catalog from "./components/pages/Catalog.jsx";
import Products from "./components/pages/Products.jsx";
import CartPage from "./components/pages/CartPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import Nosotros from "./components/pages/Nosotros.jsx";
import ProductoList from "./components/pages/ProductoList.jsx";
import ProductoForm from "./components/pages/ProductoForm.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/productos/:categoria" element={<Products />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/admin" element={<ProductoList />} />
          <Route path="/admin/add" element={<ProductoForm />} />
          <Route path="/admin/edit/:id" element={<ProductoForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}