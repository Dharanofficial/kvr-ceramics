import {useNavigate,useSearchParams} from 'react-router-dom'
import {useStore,stockState} from '../utils/storage'
export default function Header(){
  const nav=useNavigate(),[sp]=useSearchParams(),{db}=useStore()
  const low=db.products.filter(p=>stockState(p,db.settings.lowStock)!=='ok').length
  return <header className="head"><b className="brand">{db.settings.shop}</b>
    <input className="search" placeholder="Search name, code, category…" value={sp.get('q')||''} onChange={e=>nav('/products?q='+encodeURIComponent(e.target.value))}/>
    <button className="bell" title="Low / out of stock" onClick={()=>nav('/products?stock=low')}>🔔{low>0&&<i>{low}</i>}</button><span className="admin">👤 Admin</span></header>
}
