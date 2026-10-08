import {useState} from 'react'
import {useStore,uid} from '../utils/storage'
import SearchBar from './SearchBar'
import ConfirmDialog from './ConfirmDialog'
export default function CategoryManager(){
  const {db,update,notify}=useStore(),[q,setQ]=useState(''),[name,setName]=useState(''),[edit,setEdit]=useState(null),[del,setDel]=useState(null)
  const dup=n=>db.categories.some(c=>c.name.toLowerCase()===n.trim().toLowerCase()&&c.id!==edit?.id)
  const save=()=>{const n=name.trim();if(!n)return notify('Category name required');if(dup(n))return notify('Category already exists')
    if(edit){update(d=>({categories:d.categories.map(c=>c.id===edit.id?{...c,name:n}:c),products:d.products.map(p=>p.category===edit.name?{...p,category:n}:p)}));setEdit(null)}
    else update(d=>({categories:[...d.categories,{id:uid(),name:n}]}));setName('');notify('Category saved')}
  const count=n=>db.products.filter(p=>p.category===n).length
  return <div><div className="card row"><input className="search" placeholder="Category name" value={name} onChange={e=>setName(e.target.value)}/><button className="btn" onClick={save}>{edit?'Update':'Add'} Category</button>{edit&&<button className="btn ghost" onClick={()=>{setEdit(null);setName('')}}>Cancel</button>}</div>
    <SearchBar value={q} onChange={setQ} placeholder="Search category"/>
    <div className="card">{db.categories.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())).map(c=><div className="li" key={c.id}><span>{c.name} <small>({count(c.name)} products)</small></span><span className="acts"><button onClick={()=>{setEdit(c);setName(c.name)}}>Edit</button><button className="d" onClick={()=>setDel(c)}>Delete</button></span></div>)}</div>
    <ConfirmDialog text={del&&`Delete "${del.name}"? ${count(del.name)} product(s) use it.`} onNo={()=>setDel(null)} onYes={()=>{update(d=>({categories:d.categories.filter(c=>c.id!==del.id)}));setDel(null);notify('Category deleted')}}/></div>
}
