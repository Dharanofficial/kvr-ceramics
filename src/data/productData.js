const tile=(a,b)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='${a}'/><path d='M200 0V400M0 200H400' stroke='${b}' stroke-width='6'/><rect x='20' y='20' width='360' height='360' fill='none' stroke='${b}' stroke-width='3'/></svg>`)
export const seedCategories=['Floor Tiles','Wall Tiles','Bathroom Tiles','Kitchen Tiles','Parking Tiles','Vitrified Tiles','Sanitaryware','Wash Basins','Bathroom Accessories','Adhesives','Other Products'].map((name,i)=>({id:'c'+i,name}))
const P=(i,name,code,category,purchase,selling,discount,stock,unit,size,color,material,c)=>({id:'p'+i,name,code,category,subCategory:'',description:name+' – durable, premium finish ceramic product by KVR Ceramics.',purchase,selling,discount,stock,unit,brand:'KVR',size,color,material,gst:18,status:'Available',images:[{id:'i'+i,src:tile(c[0],c[1]),main:true}],createdAt:Date.now()-i*86400000})
export const seedProducts=[
P(1,'KVR Premium Floor Tile','KVR-FT-001','Floor Tiles',620,850,5,125,'Box','600x600 mm','Ivory','Ceramic',['#efe6d5','#c9b99a']),
P(2,'KVR Glossy Wall Tile','KVR-WT-001','Wall Tiles',380,520,0,12,'Box','300x450 mm','White','Ceramic',['#f4f7f9','#b8c6d0']),
P(3,'KVR Anti-Skid Bathroom Tile','KVR-BT-001','Bathroom Tiles',300,450,10,80,'Box','300x300 mm','Grey','Ceramic',['#cfd4d8','#8d979e']),
P(4,'KVR Parking Tile','KVR-PT-001','Parking Tiles',210,320,0,200,'Box','300x300 mm','Terracotta','Ceramic',['#c8765a','#8e4a33']),
P(5,'KVR Vitrified Marble Finish','KVR-VT-001','Vitrified Tiles',900,1250,8,40,'Box','800x800 mm','Beige','Vitrified',['#e9dcc3','#b49f78']),
P(6,'KVR Wash Basin Classic','KVR-WB-001','Wash Basins',1100,1650,0,8,'Piece','500 mm','White','Porcelain',['#fafafa','#9aa5ad'])]
