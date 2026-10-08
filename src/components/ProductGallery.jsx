import {useState} from 'react'
export default function ProductGallery({images}){
  const [i,setI]=useState(0),[zoom,setZoom]=useState(false)
  if(!images.length)return <div className="noimg">No image</div>
  const cur=images[Math.min(i,images.length-1)]
  return <div><img className="big" src={cur.src} alt="" onClick={()=>setZoom(true)} title="Click to zoom"/>
    <div className="thumbs">{images.map((m,k)=><img key={m.id} src={m.src} alt="" className={'sm '+(k===i?'on':'')} onClick={()=>setI(k)}/>)}</div>
    {zoom&&<div className="modal" onClick={()=>setZoom(false)}><img className="zoomed" src={cur.src} alt=""/></div>}</div>
}
