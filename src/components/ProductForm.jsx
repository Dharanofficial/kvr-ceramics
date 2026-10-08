import {useState} from 'react'
import {useStore} from '../utils/storage'
import {validateProduct} from '../utils/validation'
import ProductImageUpload from './ProductImageUpload'
const blank={name:'',code:'',category:'',subCategory:'',description:'',purchase:'',selling:'',discount:'',stock:'',unit:'Box',brand:'',size:'',color:'',material:'',gst:'18',status:'Available',images:[]}
export default function ProductForm({initial,onSave,onCancel}){
  const {db}=useStore(),[p,setP]=useState({...blank,...initial}),[err,setErr]=useState({})
  const set=k=>e=>setP({...p,[k]:e.target.value})
  const F=(k,label,type='text')=><label className={'f '+(err[k]?'bad':'')}>{label}<input type={type} min={type==='number'?0:undefined} value={p[k]} onChange={set(k)}/>{err[k]&&<small>{err[k]}</small>}</label>
  const S=(k,label,opts)=><label className={'f '+(err[k]?'bad':'')}>{label}<select value={p[k]} onChange={set(k)}><option value="">Select…</option>{opts.map(o=><option key={o}>{o}</option>)}</select>{err[k]&&<small>{err[k]}</small>}</label>
  const submit=e=>{e.preventDefault();const er=validateProduct(p,db.products,p.id);setErr(er)
    if(!Object.keys(er).length)onSave({...p,name:p.name.trim(),code:p.code.trim(),purchase:+p.purchase||0,selling:+p.selling,discount:+p.discount||0,stock:+p.stock,gst:+p.gst||0})}
  return <form className="card" onSubmit={submit}><div className="grid">
    {F('name','Product Name *')}{F('code','Product Code / SKU *')}{S('category','Category *',db.categories.map(c=>c.name))}{F('subCategory','Sub Category')}
    {F('purchase','Purchase Price (₹)','number')}{F('selling','Selling Price (₹) *','number')}{F('discount','Discount (%)','number')}{F('stock','Stock Quantity *','number')}
    {S('unit','Unit',['Box','Piece','Sq.ft','Kg','Bag','Set'])}{F('brand','Brand')}{F('size','Size')}{F('color','Color')}{F('material','Material')}{F('gst','GST %','number')}{S('status','Status',['Available','Unavailable'])}
  </div><label className="f">Description<textarea rows="3" value={p.description} onChange={set('description')}/></label>
  <h4>Product Photos</h4><ProductImageUpload images={p.images} onChange={images=>setP({...p,images})}/>
  <div className="row end"><button type="button" className="btn ghost" onClick={onCancel}>Cancel</button><button className="btn">Save Product</button></div></form>
}
