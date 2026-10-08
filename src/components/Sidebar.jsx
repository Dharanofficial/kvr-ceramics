import {NavLink} from 'react-router-dom'
const L=[['/','📊','Dashboard'],['/products','📦','Products'],['/products/new','➕','Add Product'],['/prices','💰','Prices'],['/categories','🗂️','Categories'],['/upload','⬆️','Upload'],['/settings','⚙️','Settings']]
export default function Sidebar(){
  return <aside className="side"><div className="logo"><b>KVR CERAMICS</b><small>Quality Tiles & Ceramic Products</small></div>
    <nav>{L.map(([to,i,t])=><NavLink key={to} to={to} end><span>{i}</span><em>{t}</em></NavLink>)}</nav></aside>
}
