import {useState} from 'react'
import * as XLSX from 'xlsx'
import {useStore,uid} from '../utils/storage'
import {validateProduct} from '../utils/validation'
const MAP={productname:'name',name:'name',productcode:'code',code:'code',sku:'code',category:'category',description:'description',purchaseprice:'purchase',purchase:'purchase',sellingprice:'selling',selling:'selling',price:'selling',discount:'discount',stock:'stock',unit:'unit',gst:'gst',size:'size',color:'color',material:'material'}
export default function UploadProducts(){
  const {db,update,notify}=useStore(),[rows,setRows]=useState(null),[res,setRes]=useState(null),[err,setErr]=useState('')
  const read=async f=>{setRes(null);setErr('')
    if(!/\.(csv|xlsx|xls)$/i.test(f.name))return setErr('Please upload a .csv, .xlsx or .xls file')
    try{const wb=XLSX.read(await f.arrayBuffer()),raw=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:''})
      if(!raw.length)return setErr('File has no records')
      const seen=new Set(),out=raw.map((r,i)=>{const p={}
        for(const k in r){const m=MAP[k.toLowerCase().replace(/[^a-z]/g,'')];if(m)p[m]=r[k]}
        const e=validateProduct(p,[]),code=String(p.code||'').trim().toLowerCase()
        const dup=!!code&&(db.products.some(x=>x.code.toLowerCase()===code)||seen.has(code));seen.add(code)
        return {n:i+2,p,errors:Object.values(e),dup}})
      if(!out.some(o=>o.p.name!==undefined))return setErr('No recognised columns. Need at least Product Name, Product Code, Category, Selling Price, Stock.')
      setRows(out)}catch{setErr('Could not read file')}}
  const ok=rows?.filter(r=>!r.errors.length&&!r.dup)||[]
  const confirm=()=>{const cats=new Set(db.categories.map(c=>c.name)),newCats=[...new Set(ok.map(r=>r.p.category))].filter(c=>!cats.has(c))
    update(d=>({categories:[...d.categories,...newCats.map(name=>({id:uid(),name}))],products:[...ok.map(({p})=>({id:uid(),name:String(p.name).trim(),code:String(p.code).trim(),category:p.category,subCategory:'',description:p.description||'',purchase:+p.purchase||0,selling:+p.selling,discount:+p.discount||0,stock:+p.stock,unit:p.unit||'Box',brand:'',size:p.size||'',color:p.color||'',material:p.material||'',gst:+p.gst||0,status:'Available',images:[],createdAt:Date.now()})),...d.products]}))
    setRes({total:rows.length,ok:ok.length,dup:rows.filter(r=>r.dup).length,bad:rows.filter(r=>r.errors.length).length});setRows(null);notify('Import complete')}
  const tpl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['Product Name,Product Code,Category,Description,Purchase Price,Selling Price,Discount,Stock,Unit,GST,Size,Color,Material\nSample Tile,KVR-SAMPLE-1,Floor Tiles,Demo,400,600,0,50,Box,18,600x600,White,Ceramic\n'],{type:'text/csv'}));a.download='kvr-products-template.csv';a.click()}
  return <div><h2>Upload Product List</h2><div className="card"><div className="row"><input type="file" accept=".csv,.xlsx,.xls" onChange={e=>e.target.files[0]&&read(e.target.files[0])}/><button className="btn ghost" onClick={tpl}>Download CSV template</button></div>{err&&<small className="err">{err}</small>}</div>
    {rows&&<div className="card tw"><h3>Preview: {ok.length} valid · {rows.filter(r=>r.dup).length} duplicate · {rows.filter(r=>r.errors.length).length} invalid</h3>
      <table className="tbl"><thead><tr><th>Row</th><th>Name</th><th>Code</th><th>Category</th><th>Price</th><th>Stock</th><th>Result</th></tr></thead><tbody>{rows.map(r=><tr key={r.n} className={r.errors.length?'badrow':r.dup?'duprow':''}><td>{r.n}</td><td>{r.p.name}</td><td>{r.p.code}</td><td>{r.p.category}</td><td>{r.p.selling}</td><td>{r.p.stock}</td><td>{r.errors.length?r.errors.join(', '):r.dup?'Duplicate code':'OK'}</td></tr>)}</tbody></table>
      <div className="row end"><button className="btn ghost" onClick={()=>setRows(null)}>Cancel</button><button className="btn" disabled={!ok.length} onClick={confirm}>Import {ok.length} valid products</button></div></div>}
    {res&&<div className="stats"><div className="card">Total<b>{res.total}</b></div><div className="card">Imported<b>{res.ok}</b></div><div className="card">Duplicates<b>{res.dup}</b></div><div className="card">Invalid<b>{res.bad}</b></div></div>}</div>
}
