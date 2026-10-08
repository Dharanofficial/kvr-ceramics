import {useState} from 'react'
import {uid} from '../utils/storage'
import {validateImage,readImage} from '../utils/validation'
export default function ProductImageUpload({images,onChange}){
  const [err,setErr]=useState(''),[busy,setBusy]=useState(false)
  const add=async(files,replaceId)=>{
    setBusy(true);const errs=[];let list=[...images]
    for(const f of files){const m=validateImage(f);if(m){errs.push(m);continue}
      const src=await readImage(f)
      list=replaceId?list.map(i=>i.id===replaceId?{...i,src}:i):[...list,{id:uid(),src,main:!list.some(i=>i.main)}]}
    setErr(errs.join('; '));setBusy(false);onChange(list)
  }
  const remove=id=>{let l=images.filter(i=>i.id!==id);if(l.length&&!l.some(i=>i.main))l[0]={...l[0],main:true};onChange(l)}
  return <div className="upl"><label className="drop">{busy?'Processing…':'📷 Click to upload photos (JPG, PNG, WEBP · max 5 MB)'}
    <input type="file" hidden multiple accept=".jpg,.jpeg,.png,.webp" onChange={e=>{add([...e.target.files]);e.target.value=''}}/></label>
    {err&&<small className="err">{err}</small>}
    <div className="thumbs">{images.map(i=><div key={i.id} className={'th '+(i.main?'main':'')}><img src={i.src} alt=""/>
      <div className="row">{i.main?<b>Main</b>:<button type="button" onClick={()=>onChange(images.map(x=>({...x,main:x.id===i.id})))}>Set main</button>}
      <label>Replace<input type="file" hidden accept=".jpg,.jpeg,.png,.webp" onChange={e=>{add([...e.target.files],i.id);e.target.value=''}}/></label>
      <button type="button" onClick={()=>remove(i.id)}>✕</button></div></div>)}</div></div>
}
