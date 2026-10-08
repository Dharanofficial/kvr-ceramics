import {createContext,useContext,useEffect,useState,createElement} from 'react'
import {seedProducts,seedCategories} from '../data/productData'
const K='kvr_ceramics_v1'
export const defaults=()=>({products:seedProducts,categories:seedCategories,history:[],settings:{shop:'KVR Ceramics',lowStock:20}})
const load=()=>{try{const d=JSON.parse(localStorage.getItem(K));if(d)return d}catch{}return defaults()}
const Ctx=createContext()
export function StoreProvider({children}){
  const [db,setDb]=useState(load),[toast,setToast]=useState(null)
  useEffect(()=>{try{localStorage.setItem(K,JSON.stringify(db))}catch{setToast('Storage full – remove some images')}},[db])
  const notify=m=>{setToast(m);setTimeout(()=>setToast(null),2500)}
  const update=fn=>setDb(d=>({...d,...fn(d)}))
  return createElement(Ctx.Provider,{value:{db,update,notify,reset:()=>setDb(defaults())}},children,toast&&createElement('div',{className:'toast'},toast))
}
export const useStore=()=>useContext(Ctx)
export const uid=()=>Math.random().toString(36).slice(2,9)
export const mainImg=p=>(p.images.find(i=>i.main)||p.images[0]||{}).src
export const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN')
export const stockState=(p,low)=>p.stock<=0?'out':p.stock<=low?'low':'ok'
