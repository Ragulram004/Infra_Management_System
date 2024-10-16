
import {useState} from 'react' 
import {useAsyncDebounce} from 'react-table'

const StatsFilter = ({globalFilter , setGlobalFilter}) => {
	const [value,setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce((value)=>{
		setGlobalFilter(value || undefined)
	},0)
	
  return (
    <div className=" absolute flex items-center bg-background rounded-full border border-border px-2 py-[2px] top-[.1rem] ml-3 w-[10rem] md:w-auto">
      <input 
        className="bg-transparent focus:outline-none w-full pl-2 text-primary placeholder-gray-400"
        placeholder="Search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <svg 
        className="w-5 h-5 text-gray-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"></path>
      </svg>
    </div>

  )
}

export default StatsFilter