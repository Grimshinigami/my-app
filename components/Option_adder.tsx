import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function Option_adder({nos,num,optVal,showBtn,ind, fn,fn2}:
    {nos:Boolean,num?:string,optVal:string,showBtn:Boolean,ind:Number,fn:any,fn2:any}) {
    if(nos)
    {
    return (
    <div className=" flex flex-row gap-2">
        <p>{num}</p>
        <input 
        value={optVal} 
        className=' focus:bg-gray-200 outline-none'
        onChange={(e)=>fn(ind,e.target.value)} />
        {showBtn && 
        <div className=" flex-1 flex justify-end pr-4">
            <button onClick={()=>fn2(ind)}>X</button>
        </div>
        }
    </div>
  )}

  return (
    <div className=" flex flex-row gap-2">
        <div className=' border-2 border-gray-400 rounded-md w-6 h-6'>
        </div>
        <input 
        value={optVal} 
        className=' focus:bg-gray-200 outline-none'
        onChange={(e)=>fn(ind,e.target.value)} />
        {showBtn && 
        <div className=" flex-1 flex justify-end pr-4">
            <button onClick={()=>fn2(ind)}>X</button>
        </div>
        }
    </div>
  )
}

export default Option_adder