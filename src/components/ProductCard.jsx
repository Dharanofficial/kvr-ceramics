import {mainImg,inr} from '../utils/storage'
export default function ProductCard({p,a}){
  const final=p.selling*(1-p.discount/100)
  return <div className="card pc"><img src={mainImg(p)} alt=""/><h4>{p.name}</h4><small>{p.code} · {p.category}</small>
    <div><b>{inr(final)}</b> / {p.unit} {p.discount>0&&<s>{inr(p.selling)}</s>}</div>
    <div>Stock: {p.stock} {p.unit} · <span className={'pill '+p.status}>{p.status}</span></div>
    <div className="acts"><button onClick={()=>a.view(p)}>View Details</button><button onClick={()=>a.edit(p)}>Edit</button><button className="d" onClick={()=>a.del(p)}>Delete</button></div></div>
}
