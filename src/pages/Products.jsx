import {useState,useMemo} from 'react'
import {useNavigate,useSearchParams,Link} from 'react-router-dom'
import {useStore,uid,stockState} from '../utils/storage'
import ProductCard from '../components/ProductCard'
import ProductTable from '../components/ProductTable'
import ConfirmDialog from '../components/ConfirmDialog'
export default function Products(){
  const {db,update,notify}=useStore(),nav=useNavigate(),[sp]=useSearchParams(),q=(sp.get('q')||'').toLowerCase()
  const [f,setF]=useState({cat:'',stock:sp.get('stock')||'',price:'',status:'',sort:'new'}),[view,setView]=useState('table'),[del,setDel]=useState(null)
  const set=k=>e=>setF({...f,[k]:e.target.value}),low=db.settings.lowStock
  const list=useMemo(()=>{
    const [a,b]=f.price?f.price.split('-').map(Number):[0,0]
    const l=db.products.filter(p=>(!q||[p.name,p.code,p.category].some(s=>(s||'').toLowerCase().includes(q)))&&(!f.cat||p.category===f.cat)&&(!f.status||p.status===f.status)
      &&(!f.stock||(f.stock==='low'?stockState(p,low)!=='ok':f.stock==='out'?p.stock<=0:p.stock>low))&&(!f.price||(p.selling>=a&&p.selling<(b||Infinity))))
    const s={new:(x,y)=>y.createdAt-x.createdAt,name:(x,y)=>x.name.localeCompare(y.name),asc:(x,y)=>x.selling-y.selling,desc:(x,y)=>y.selling-x.selling}[f.sort]
    return l.sort(s)},[db,q,f,low])
  const a={view:p=>nav('/products/'+p.id),edit:p=>nav(`/products/${p.id}/edit`),del:p=>setDel(p),
    dup:p=>{let code=p.code+'-COPY';while(db.products.some(x=>x.code===code))code+='2';update(d=>({products:[{...p,id:uid(),code,name:p.name+' (Copy)',createdAt:Date.now()},...d.products]}));notify('Product duplicated')},
    toggle:p=>update(d=>({products:d.products.map(x=>x.id===p.id?{...x,status:x.status==='Available'?'Unavailable':'Available'}:x)}))}
  return <div><div className="row between"><h2>Products ({list.length})</h2><div className="row"><button className="btn ghost" onClick={()=>setView(view==='table'?'cards':'table')}>{view==='table'?'Card view':'Table view'}</button><Link className="btn" to="/products/new">+ Add</Link></div></div>
    <div className="card filters">
      <select value={f.cat} onChange={set('cat')}><option value="">All categories</option>{db.categories.map(c=><option key={c.id}>{c.name}</option>)}</select>
      <select value={f.stock} onChange={set('stock')}><option value="">Any stock</option><option value="low">Low / out</option><option value="out">Out of stock</option><option value="in">In stock</option></select>
      <select value={f.price} onChange={set('price')}><option value="">Any price</option><option value="0-500">Under ₹500</option><option value="500-1000">₹500–1000</option><option value="1000-">₹1000+</option></select>
      <select value={f.status} onChange={set('status')}><option value="">Any status</option><option>Available</option><option>Unavailable</option></select>
      <select value={f.sort} onChange={set('sort')}><option value="new">Recently added</option><option value="name">Name A–Z</option><option value="asc">Price low→high</option><option value="desc">Price high→low</option></select></div>
    {!list.length?<div className="card empty">No products match. <Link to="/products/new">Add one</Link></div>:view==='table'?<ProductTable list={list} a={a}/>:<div className="cards">{list.map(p=><ProductCard key={p.id} p={p} a={a}/>)}</div>}
    <ConfirmDialog text={del&&`Delete "${del.name}"?`} onNo={()=>setDel(null)} onYes={()=>{update(d=>({products:d.products.filter(x=>x.id!==del.id)}));setDel(null);notify('Product deleted')}}/></div>
}
