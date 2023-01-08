import "./App.css";
import {Route, Navigate, Routes} from "react-router-dom";
import Login from "./components/Auth/login";
import {PrivateRoute} from "./routes/privateRoute";
import NotFoundPage from "./components/Auth/notFound";
import AdminLayout from "./components/Layout/AdminLayout";
import ListOfProducts from "./components/Admin/Product/listProducts";
import CreateAProduct, {CreateProductInfo} from "./components/Admin/Product/create";
import {EditProductInfo} from "./components/Admin/Product/edit";

function App() {
  return (
      <>
        <Routes>
          <Route path="/login" element={<Login/>}/>

          <Route exact path="/" element={<PrivateRoute/>}>
            <Route path="/admin" element={<AdminLayout/>}>
              <Route path="products" element={<ListOfProducts />} />
              <Route path="products/create" element={<CreateProductInfo />} />
              <Route path="products/:id/edit" element={<EditProductInfo />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </>
  );
}

export default App;
