export default function SearchBar({value,onChange,placeholder}){return <input className="search" value={value} placeholder={placeholder||'Search…'} onChange={e=>onChange(e.target.value)}/>}
