import {Link} from 'react-router-dom'
import {useStore,mainImg,inr,stockState} from '../utils/storage'
export default function Dashboard(){
  const {db}=useStore(),P=db.products,low=P.filter(p=>stockState(p,db.settings.lowStock)!=='ok')
  const recent=[...P].sort((a,b)=>b.createdAt-a.createdAt).slice(0,5)
  const List=({l})=>l.length?l.map(p=><Link className="li" key={p.id} to={'/products/'+p.id}><img className="mini" src={mainImg(p)} alt=""/><span>{p.name}<br/><small>{p.code}</small></span><b>{p.stock} {p.unit}</b></Link>):<p className="empty">Nothing here yet</p>
  return <div><h2>Dashboard</h2><div className="row"><Link className="btn" to="/products/new">+ Quick Add Product</Link><Link className="btn ghost" to="/products">Product List</Link><Link className="btn ghost" to="/upload">Upload Products</Link></div>
    <div className="stats"><div className="card">Total Products<b>{P.length}</b></div><div className="card">Total Categories<b>{db.categories.length}</b></div><div className="card">Total Product Value<b>{inr(P.reduce((s,p)=>s+p.stock*p.selling,0))}</b></div></div>
    <div className="two"><div className="card"><h3>Recently Added</h3><List l={recent}/></div><div className="card"><h3>Low Stock</h3><List l={low}/></div></div></div>
}
