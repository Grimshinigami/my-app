"use client"
import { Key, useEffect, useState } from "react"
import Form_question from "./Form_question"
import { QuestionT } from "@/types/QuestionType"
import { uid } from "uid"
import { nanoid } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import { addQues, QuestionArr } from "@/lib/features/Questions/questionSlice"
import { FormT } from "@/types/FormType"
import { updateDesc, updateTitle, loadFormFromLocal, saveFormToLocal} from "@/lib/features/FormDetails/formSlice"
import { loadFormQuestions } from "@/lib/features/Questions/questionSlice"
import { redirect, useRouter } from "next/navigation"

function Form_creator() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [counter, setCounter] = useState<number>(0)
    let Questionst1 = useSelector((state:any)=>state.questions.questions)   
    let Formst1 = useSelector((state:any)=>state.forms.forms)
    const userEmail = localStorage.getItem('auth')
    const FormObject = JSON.parse(localStorage.getItem(`forms_${userEmail}`)|| "{}")
    if(counter<3 && Object.entries(FormObject).length>0 && Questionst1.length==0){
        dispatch(loadFormQuestions({}))
        setCounter(prev=>++prev)
    }
    if(counter<3 && Object.entries(FormObject).length>0 && Formst1.length===0){
        dispatch(loadFormFromLocal({}))
    }

    const Questions = useSelector((state:any)=>state.questions.questions)
    // console.log(Questions)
    const Forms = useSelector((state:any)=>state.forms.forms)
    // console.log("Forms are: ",Forms)
    const [currFormId, setCurrFormId] = useState<string>('')
    const [currForm, setCurrForm] = useState<FormT[]>([])

    useEffect(() => {
      const temp = localStorage.getItem("currentForm");
    //   console.log(temp)
      if(temp){
        setCurrFormId(temp)
      }
      const Form = Forms.filter((form:any)=>form.id===temp)
      console.log(Form[0])
      setCurrForm(Form[0])
      setFormTitle(Form[0].formTitle)
      setFormDesc(Form[0].desc)

    }, [])
    
    // console.log(currFormId);
    // const Form = Forms.filter((form:any)=>form.id===currFormId)
    // console.log(currForm);
    
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
    
    function FormSaver(){
        dispatch(saveFormToLocal({newTitle:formTitle,newDesc:formDesc,questions:questions}))
    }

    function ViewHandler(){
        router.push('/submitform')
    }

  return (
    <div className=" w-full h-full border-2 border-red-300 flex flex-col">
        <div className=" h-[15%] border-2 border-indigo-300">
            <div className=" h-[60%] border-2 border-black flex">
                <button onClick={()=>router.push('/')}>Home</button>
                <p className=" w-[20%] border-2 border-red-600"> {formTitle}</p>
                <div className=" flex-1 flex justify-end border-2 border-pink-300 gap-2">
                    <button onClick={()=>ViewHandler()}>View Form</button>
                    <button onClick={()=>FormSaver()}>Save Form</button>
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
            {questions?.map((question:QuestionT)=>{
                // console.log(question)
                return <Form_question key={question.id} chId={question.id}/>
            })}
            <div className=" mx-auto order-last">
                <button onClick={()=>handleAddQuestion()}>Add Question</button>
            </div>
        </div>
    </div>
  )
}

export default Form_creator