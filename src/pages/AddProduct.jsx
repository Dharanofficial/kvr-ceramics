import {useNavigate,useParams} from 'react-router-dom'
import {useStore,uid} from '../utils/storage'
import ProductForm from '../components/ProductForm'
export default function AddProduct(){
  const {id}=useParams(),nav=useNavigate(),{db,update,notify}=useStore(),cur=id&&db.products.find(p=>p.id===id)
  if(id&&!cur)return <p className="empty">Product not found</p>
  const save=p=>{
    if(cur){const changed=['purchase','selling','discount'].some(k=>cur[k]!==p[k])
      update(d=>({products:d.products.map(x=>x.id===id?p:x),history:changed?[{id:uid(),pid:id,name:p.name,date:Date.now(),purchase:p.purchase,selling:p.selling,discount:p.discount},...d.history]:d.history}))}
    else update(d=>({products:[{...p,id:uid(),createdAt:Date.now()},...d.products]}))
    notify('Product saved');nav('/products')}
  return <div><h2>{cur?'Edit':'Add'} Product</h2><ProductForm initial={cur||undefined} onSave={save} onCancel={()=>nav(-1)}/></div>
}
