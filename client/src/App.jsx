import Navbar from "./components/Navbar";
import ProductActions from "./components/ProductActions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import DeleteProduct from "./pages/DeleteProduct";
import ProductDetail from "./pages/ProductDetail";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateForm from "./pages/UpdateForm";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ProductActions />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<UpdateProduct />} path="/updateProduct" />
          <Route element={<ProductDetail />} path="/product/:_id" />
          <Route element={<CreateProduct />} path="/newProduct" />
          <Route element={<DeleteProduct />} path="/deleteProduct" />
          <Route element={<UpdateForm />} path="/updateproduct/:_id" />
          <Route element={<Error />} path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
