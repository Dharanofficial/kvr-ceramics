import {mainImg,inr} from '../utils/storage'
export default function ProductTable({list,a}){
  return <div className="card tw"><table className="tbl"><thead><tr>{['Image','Name','Code','Category','Purchase','Selling','Disc.','Stock','Unit','Status','Actions'].map(h=><th key={h}>{h}</th>)}</tr></thead>
    <tbody>{list.map(p=><tr key={p.id}><td data-l="Image">{mainImg(p)?<img className="mini" src={mainImg(p)} alt=""/>:'—'}</td>
      <td data-l="Name"><b>{p.name}</b></td><td data-l="Code">{p.code}</td><td data-l="Category">{p.category}</td><td data-l="Purchase">{inr(p.purchase)}</td>
      <td data-l="Selling">{inr(p.selling)}</td><td data-l="Disc.">{p.discount}%</td><td data-l="Stock">{p.stock}</td><td data-l="Unit">{p.unit}</td>
      <td data-l="Status"><span className={'pill '+p.status}>{p.status}</span></td>
      <td data-l="Actions" className="acts"><button onClick={()=>a.view(p)}>View</button><button onClick={()=>a.edit(p)}>Edit</button><button onClick={()=>a.dup(p)}>Duplicate</button><button onClick={()=>a.toggle(p)}>Status</button><button className="d" onClick={()=>a.del(p)}>Delete</button></td></tr>)}</tbody></table></div>
}
