"use client"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Key, useEffect, useState } from 'react';
import Option_adder from './Option_adder';
import { QuestionT } from '@/types/QuestionType';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateQuesText, 
  updateAnswerType,
  updateQuestionText,
  updateQuestionDate,
  addQuesDropdown,
  updateQuesDropdownVal,
  removeQuesDropdownVal,
  addQuesCheckBox,
  updateQuesCheckboxVal,
  removeQuesCheckBoxVal,
  updateLinearScale,
  toggleRequired,
  deleteQues
} from '@/lib/features/Questions/questionSlice';
import { text } from 'stream/consumers';

function Form_question({chId}:{chId:Key}) {

    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState<String>('')
    const [labelType, setLabelType] = useState<string>('Text');
    const [minLinearType, setMinLinearType] = useState<string>('1');
    const [maxLinearType, setMaxLinearType] = useState<string>('5');
    const [textval, setTextVal] = useState<string> ('')
    const [dateVal, setDateVal] = useState<string> ('')
    const [dropDownVals, setDropDownVals] = useState<string[]>(["Option 1"])
    const [checkBoxVals, setCheckBoxVals] = useState<string[]>(["Option 1"])

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(updateAnswerType({id:chId,answerType:event.target.value}))
        setTextVal('')
        setDateVal('')
        setDropDownVals(["Option 1"])
        setCheckBoxVals(["Option 1"])
        setLabelType(event.target.value);
    };

    const handleMinChange = (event: SelectChangeEvent) => {
        dispatch(updateLinearScale({id:chId,type:'0',updatedVal:event.target.value}))
        setMinLinearType(event.target.value);
    };

    const handleMaxChange = (event: SelectChangeEvent) => {
        dispatch(updateLinearScale({id:chId,type:'1',updatedVal:event.target.value}))
        setMaxLinearType(event.target.value);
    };

    function handleQuestionChange(val:string){
        dispatch(updateQuesText({id:chId,questionText:val}))
        setQuestionText(val)
    }
    
    function handleTextChange(val:string){
      dispatch(updateQuestionText({id:chId,textAnswer:val}))
      setTextVal(val)
    }

    function handleDateChange(val:string){
      dispatch(updateQuestionDate({id:chId,dateAnswer:val}))
      setDateVal(val)
    }
    
    function handleDropDownAdd(){
      dispatch(addQuesDropdown({id:chId}))
      const temp = "Option "+String(dropDownVals.length+1)
      setDropDownVals([...dropDownVals,temp])
    }

    function handleDropDownChange(index:Number, updatedDp:string){
      const updatedDropDown = dropDownVals.map((dropDown, i)=>(
        i===index?updatedDp:dropDown
      ))
      dispatch(updateQuesDropdownVal({id:chId,index:index,updatedDp:updatedDp}))
      setDropDownVals(updatedDropDown)
    }

    function handleDropDownRemove(index:Number){
      const updatedDropDown = dropDownVals.filter((_,i)=>(
        i!==index
      ))
      dispatch(removeQuesDropdownVal({id:chId,index:index}))
      setDropDownVals(updatedDropDown)
    }

    function handleCheckBoxAdd(){
      dispatch(addQuesCheckBox({id:chId}))
      const temp = "Option "+String(checkBoxVals.length+1)
      setCheckBoxVals([...checkBoxVals,temp])
    }

    function handleCheckBoxChange(index:Number, updatedCh:string){
      const updatedCheckbox = checkBoxVals.map((checkBx, i)=>(
        i===index?updatedCh:checkBx
      ))
      dispatch(updateQuesCheckboxVal({id:chId,index:index,updatedCh:updatedCh}))
      setCheckBoxVals(updatedCheckbox)
    }

    function handleCheckBoxRemove(index:Number){
      const updatedCheckBox = checkBoxVals.filter((_,i)=>(
        i!==index
      ))
      dispatch(removeQuesCheckBoxVal({id:chId,index:index}))
      setCheckBoxVals(updatedCheckBox)
    }

  return (
    <div className=" w-full md:w-[50%] mx-auto border-2 border-rose-600 p-2 rounded-md">
        <FormControl className=' flex flex-col gap-2 w-full'>
          <TextField
            id="outlined-textarea"
            placeholder="Question"
            value={questionText}
            onChange={(e)=>handleQuestionChange(e.target.value)}
            multiline
            className=' w-full md:w-[50%]'
          />
          <Select
            labelId='input-select-label'
            id='input-select'
            value={labelType}
            onChange={handleChange}
            className=' w-[50%] md:w-[30%]'
          >
            <MenuItem value={"Text"}>Text</MenuItem>
            <MenuItem value={"Date"}>Date</MenuItem>
            <MenuItem value={"Dropdown"}>Dropdown</MenuItem>
            <MenuItem value={"Checkbox"}>CheckBox</MenuItem>
            <MenuItem value={"LinearScale"}>Linear Scale</MenuItem>
          </Select>

          {labelType==="Text" &&
          <TextField
            id="outlined-textarea"
            placeholder="Text-answer"
            value={textval}
            onChange={(e)=> handleTextChange(e.target.value)}
            multiline
            className=' w-full'
          />
          }

          {labelType==="Date" && 
          <input 
          className=' w-[50%] border-2 border-gray-400 hover:border-blue-500 p-2'
          type="date" 
          value={dateVal}
          onChange={(e)=>handleDateChange(e.target.value)}
          />
          }

          {labelType==='Dropdown' && 
          <div className=' w-[90%] p-2 rounded-md flex flex-col gap-2'>
            {dropDownVals.map((dropDown,index)=>(
              <Option_adder 
              key={index} 
              nos={true} 
              num={`${String(index+1)}.`} 
              optVal={dropDown} 
              showBtn={(dropDownVals.length)>1?true:false}
              ind={index}
              fn={handleDropDownChange}
              fn2={handleDropDownRemove}
              />
            ))}
            <div className=' order-last pl-1'>
              <button onClick={()=> handleDropDownAdd()}>Add Option</button>
            </div>
          </div>
          }

          {labelType==="Checkbox" &&
          <div className=' w-[90%] p-2 rounded-md flex flex-col gap-2'>
            {/* <Option_adder nos={false} num={'1'}optVal={"Option 1"} showBtn={true}/>
            <Option_adder nos={false} num={'2'} optVal={"Option 2"} showBtn={true}/> */}
            {checkBoxVals.map((checkBox,index)=>(
              <Option_adder 
              key={index} 
              nos={false} 
              optVal={checkBox} 
              showBtn={(checkBoxVals.length)>1?true:false}
              ind={index}
              fn={handleCheckBoxChange}
              fn2={handleCheckBoxRemove}
              />
            ))}
            <div className=' order-last pl-1'>
              <button onClick={()=> handleCheckBoxAdd()}>Add Checkbox</button>
            </div>
          </div>
          }
          
          {labelType==="LinearScale" &&
          
          <div className=' flex flex-row'>
            <FormControl className='w-[18%] md:w-[10%]'>
              <Select
              labelId='input-linear-min-scale'
              id='linear-min-scale'
              value={minLinearType}
              onChange={handleMinChange}
              className=''
              >
                <MenuItem value={"0"}>0</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
              </Select>
            </FormControl>
            <p className=' w-[15%] md:w-[10%] text-center flex items-center justify-center'>to</p>
            <FormControl className=' w-[18%] md:w-[10%]'>
              <Select
              labelId='input-linear-max-scale'
              id='linear-max-scale'
              value={maxLinearType}
              onChange={handleMaxChange}
              className=''
              >
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
                <MenuItem value={"7"}>7</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
                <MenuItem value={"9"}>9</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
              </Select>
            </FormControl>
          </div>
          }
        </FormControl>
        <div className=' flex flex-row justify-end gap-4 pr-8'>
          <button onClick={()=> dispatch(deleteQues({id:chId}))}>Del</button>
          <button onClick={()=> dispatch(toggleRequired({id:chId}))}>Req</button>
        </div>
    </div>
  )
}

export default Form_question