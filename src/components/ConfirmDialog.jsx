export default function ConfirmDialog({text,onYes,onNo}){
  if(!text)return null
  return <div className="modal" onClick={onNo}><div className="box" onClick={e=>e.stopPropagation()}><h3>Please confirm</h3><p>{text}</p><div className="row end"><button className="btn ghost" onClick={onNo}>Cancel</button><button className="btn danger" onClick={onYes}>Confirm</button></div></div></div>
}
