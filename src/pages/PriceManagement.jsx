import {useState} from 'react'
import {useStore,uid,inr} from '../utils/storage'
import PriceForm from '../components/PriceForm'
export default function PriceManagement(){
  const {db,update,notify}=useStore(),[sel,setSel]=useState(''),[bulk,setBulk]=useState({cat:'',pct:''}),p=db.products.find(x=>x.id===sel)
  const log=(x,n)=>({id:uid(),pid:x.id,name:x.name,date:Date.now(),purchase:n.purchase,selling:n.selling,discount:n.discount})
  const save=n=>{update(d=>({products:d.products.map(x=>x.id===sel?{...x,...n}:x),history:[log(p,n),...d.history]}));notify('Prices updated')}
  const applyBulk=()=>{const k=1+(+bulk.pct)/100;if(isNaN(k)||k<=0||!bulk.pct)return notify('Enter a valid percentage')
    update(d=>{const ch=d.products.filter(x=>!bulk.cat||x.category===bulk.cat).map(x=>({...x,selling:Math.round(x.selling*k)}))
      return {products:d.products.map(x=>ch.find(c=>c.id===x.id)||x),history:[...ch.map(x=>log(x,x)),...d.history]}});notify('Bulk update applied')}
  return <div><h2>Price Management</h2><div className="card"><select value={sel} onChange={e=>setSel(e.target.value)}><option value="">Select product…</option>{db.products.map(x=><option key={x.id} value={x.id}>{x.name} ({x.code})</option>)}</select></div>
    {p&&<PriceForm key={p.id+p.selling+p.purchase+p.discount} product={p} onSave={save}/>}
    <div className="card"><h3>Bulk update selling price</h3><div className="row"><select value={bulk.cat} onChange={e=>setBulk({...bulk,cat:e.target.value})}><option value="">All products</option>{db.categories.map(c=><option key={c.id}>{c.name}</option>)}</select>
      <input type="number" placeholder="% change (e.g. 5 or -10)" value={bulk.pct} onChange={e=>setBulk({...bulk,pct:e.target.value})}/><button className="btn" onClick={applyBulk}>Apply</button></div></div>
    <div className="card"><h3>Price history</h3>{!db.history.length&&<p className="empty">No changes yet</p>}{db.history.slice(0,50).map(h=><div className="li" key={h.id}><span>{h.name}<br/><small>{new Date(h.date).toLocaleString()}</small></span><span>Buy {inr(h.purchase)} · Sell {inr(h.selling)} · {h.discount}%</span></div>)}</div></div>
}
