import {useStore} from '../utils/storage'
export default function Settings(){
  const {db,update,reset,notify}=useStore()
  const set=(k,v)=>update(d=>({settings:{...d.settings,[k]:v}}))
  return <div><h2>Settings</h2><div className="card"><label className="f">Shop name<input value={db.settings.shop} onChange={e=>set('shop',e.target.value)}/></label>
    <label className="f">Low stock threshold<input type="number" min="0" value={db.settings.lowStock} onChange={e=>set('lowStock',Math.max(0,+e.target.value))}/></label>
    <button className="btn danger" onClick={()=>{if(confirm('Reset all data to demo data?')){reset();notify('Data reset')}}}>Reset to demo data</button></div></div>
}
