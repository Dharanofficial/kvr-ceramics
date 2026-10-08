import {useState} from 'react'
import {calc} from '../utils/priceCalculator'
import {inr} from '../utils/storage'
export default function PriceForm({product,onSave}){
  const [v,setV]=useState({purchase:product.purchase,selling:product.selling,discount:product.discount})
  const set=k=>e=>setV({...v,[k]:e.target.value}),r=calc(v.purchase,v.selling,v.discount),bad=[v.purchase,v.selling,v.discount].some(x=>+x<0)
  return <div className="card"><h3>{product.name}</h3><div className="grid">
    {[['purchase','Purchase Price'],['selling','Selling Price'],['discount','Discount %']].map(([k,l])=><label className="f" key={k}>{l}<input type="number" min="0" value={v[k]} onChange={set(k)}/></label>)}</div>
    <div className="stats"><div>Discount: <b>{inr(r.discountAmount)}</b></div><div>Final Price: <b>{inr(r.final)}</b></div><div>Profit: <b className={r.profit<0?'neg':''}>{inr(r.profit)}</b></div><div>Profit %: <b>{r.profitPct}%</b></div></div>
    {bad&&<small className="err">Prices cannot be negative</small>}<button className="btn" disabled={bad} onClick={()=>onSave({purchase:+v.purchase||0,selling:+v.selling||0,discount:+v.discount||0})}>Update Prices</button></div>
}
