import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'
import PriceManagement from './pages/PriceManagement'
import Categories from './pages/Categories'
import UploadProducts from './pages/UploadProducts'
import Settings from './pages/Settings'
export default function App(){
  return <div className="app"><Sidebar/><div className="main"><Header/><main className="content"><Routes>
    <Route path="/" element={<Dashboard/>}/><Route path="/products" element={<Products/>}/>
    <Route path="/products/new" element={<AddProduct/>}/><Route path="/products/:id" element={<ProductDetails/>}/>
    <Route path="/products/:id/edit" element={<AddProduct/>}/><Route path="/prices" element={<PriceManagement/>}/>
    <Route path="/categories" element={<Categories/>}/><Route path="/upload" element={<UploadProducts/>}/>
    <Route path="/settings" element={<Settings/>}/>
  </Routes></main></div></div>
}
