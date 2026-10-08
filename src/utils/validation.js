const TYPES=['image/jpeg','image/png','image/webp'],MAX=5*1024*1024
export const validateImage=f=>!TYPES.includes(f.type)?`${f.name}: only JPG, JPEG, PNG, WEBP allowed`:f.size>MAX?`${f.name}: larger than 5 MB`:null
export const readImage=file=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const s=Math.min(1,800/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.8))};i.onerror=rej;i.src=r.result};r.onerror=rej;r.readAsDataURL(file)})
export function validateProduct(p,products,selfId){
  const e={},num=v=>v===''||v==null?NaN:Number(v)
  if(!String(p.name||'').trim())e.name='Product name is required'
  if(!String(p.code||'').trim())e.code='Product code is required'
  else if(products.some(x=>x.id!==selfId&&x.code.toLowerCase()===String(p.code).trim().toLowerCase()))e.code='Duplicate product code'
  if(!p.category)e.category='Category is required'
  const s=num(p.selling);if(isNaN(s))e.selling='Selling price is required';else if(s<0)e.selling='Cannot be negative'
  const st=num(p.stock);if(isNaN(st))e.stock='Stock is required';else if(st<0)e.stock='Cannot be negative'
  if(p.purchase!==''&&p.purchase!=null&&num(p.purchase)<0)e.purchase='Cannot be negative'
  if(p.discount!==''&&p.discount!=null&&(num(p.discount)<0||num(p.discount)>100))e.discount='Must be 0–100'
  return e
}
