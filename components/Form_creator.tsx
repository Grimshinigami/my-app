"use client"
import { Key, useEffect, useState } from "react"
import Form_question from "./Form_question"
import { QuestionT } from "@/types/QuestionType"
import { uid } from "uid"
import { nanoid } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import { addQues, QuestionArr } from "@/lib/features/Questions/questionSlice"
import { FormT } from "@/types/FormType"
import { updateDesc, updateTitle } from "@/lib/features/FormDetails/formSlice"

function Form_creator() {

    const Questions = useSelector((state:any)=>state.questions.questions)   
    const Forms = useSelector((state:any)=>state.forms.forms)
    // console.log(Forms);
    const [currFormId, setCurrFormId] = useState<string>('')
    const [currForm, setCurrForm] = useState<FormT[]>([])

    useEffect(() => {
      const temp = localStorage.getItem("currForm");

      if(temp){
        setCurrFormId(temp)
      }
      const Form = Forms.filter((form:any)=>form.id===temp)
      setCurrForm(Form)

    }, [])
    
    // console.log(currFormId);
    // const Form = Forms.filter((form:any)=>form.id===currFormId)
    console.log(currForm);
    
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState<QuestionT[]>(Questions)
    const [formTitle, setFormTitle] = useState<string>((currForm.length==0?"Untitled Form":currForm[0]?.formTitle))
    const [formDesc, setFormDesc] = useState<string>((currForm.length==0?"Form Description":currForm[0]?.desc))

    const handleAddQuestion = () =>{
        dispatch(addQues({questionText:""}))
    }

    function handleFormTitleChange(val:string){
        dispatch(updateTitle({id:currFormId,formTitle:val}))
        setFormTitle(val)
    }

    function handleFormDescChange(val:string){
        dispatch(updateDesc({id:currFormId,desc:val}))
        setFormDesc(val)
    }

    useEffect(() => {
      setQuestions(Questions)
    }, [Questions])
    

  return (
    <div className=" w-full h-full border-2 border-red-300 flex flex-col">
        <div className=" h-[15%] border-2 border-indigo-300">
            <div className=" h-[60%] border-2 border-black flex">
                <p className=" w-[20%] border-2 border-red-600"> Form Title</p>
                <div className=" flex-1 flex justify-end border-2 border-pink-300">
                    <button>Send Button</button>
                </div>
                <div className=" w-[20%] flex justify-end">
                    User Avatar Icon
                </div>
            </div>
            <div className=" flex-1 flex flex-row p-2 gap-4 justify-center border-2 border-green-400">
                <div>
                    Questions
                </div>
                <div>
                    Responses
                </div>
            </div>
        </div>
        <div className=" flex-1 flex flex-col border-2 border-yellow-600 p-2 gap-3">
            <div className=" w-full md:w-[50%] md:mx-auto border-2 border-orange-300 rounded-md p-2 flex flex-col gap-4">
                <input 
                className=" text-3xl outline-none" 
                value={formTitle} 
                onChange={(e)=> handleFormTitleChange(e.target.value)}/>
                <input 
                className=" outline-none" 
                value={formDesc} 
                onChange={(e)=> handleFormDescChange(e.target.value)}/>
                
            </div>
            {/* <Form_question/> */}
            {questions?.map((question:QuestionT)=>(
                <Form_question key={question.id} chId={question.id}/>
            ))}
            <div className=" mx-auto order-last">
                <button onClick={()=>handleAddQuestion()}>Add Question</button>
            </div>
        </div>
    </div>
  )
}

export default Form_creator