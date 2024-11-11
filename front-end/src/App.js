import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import { Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import LoginComponent from './components/Login';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import UpdateComponent from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/home" element={<h1>HOME</h1>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/addproduct" element={<AddProduct/>}/>
      <Route path="/updateproduct/:id" element={<UpdateComponent/>}/>
      <Route path="/logout" element={<h1>LOG-OUT</h1>}/>
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<LoginComponent/>}/>
    </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
