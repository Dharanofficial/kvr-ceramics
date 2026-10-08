import {useState} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {useStore,inr} from '../utils/storage'
import {calc} from '../utils/priceCalculator'
import ProductGallery from '../components/ProductGallery'
import ConfirmDialog from '../components/ConfirmDialog'
export default function ProductDetails(){
  const {id}=useParams(),nav=useNavigate(),{db,update,notify}=useStore(),[del,setDel]=useState(false),p=db.products.find(x=>x.id===id)
  if(!p)return <p className="empty">Product not found. <Link to="/products">Back</Link></p>
  const r=calc(p.purchase,p.selling,p.discount)
  const rows=[['SKU',p.code],['Category',p.category],['Purchase',inr(p.purchase)],['Selling',inr(p.selling)],['Discount',p.discount+'%'],['Final price',inr(r.final)],['Stock',`${p.stock} ${p.unit}`],['GST',p.gst+'%'],['Material',p.material],['Size',p.size],['Color',p.color],['Status',p.status]]
  return <div><Link to="/products">← Back to Product List</Link><div className="card two"><ProductGallery images={p.images}/><div><h2>{p.name}</h2><p>{p.description}</p>
    <table className="kv"><tbody>{rows.map(([k,v])=><tr key={k}><th>{k}</th><td>{v||'—'}</td></tr>)}</tbody></table>
    <div className="row"><Link className="btn" to={`/products/${p.id}/edit`}>Edit Product</Link><button className="btn danger" onClick={()=>setDel(true)}>Delete Product</button></div></div></div>
    <ConfirmDialog text={del&&`Delete "${p.name}"?`} onNo={()=>setDel(false)} onYes={()=>{update(d=>({products:d.products.filter(x=>x.id!==id)}));notify('Product deleted');nav('/products')}}/></div>
}
