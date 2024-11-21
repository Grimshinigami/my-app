"use client"

import { QuestionT } from "@/types/QuestionType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSubmitFormPage(){

    const router = useRouter();
    
    const userEmail = localStorage.getItem('auth')
    const currentFormID = localStorage.getItem('currentForm') || ""
    const userForms = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")
    
    const formObject = (currentFormID in userForms)?userForms[currentFormID]:[]

    // console.log(formObject)

    let temp = [...Object.values(formObject?.questions)]

    const formQuestions = (temp!=undefined)?[temp]:[]
    
    console.log(formQuestions)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data={}
        for (const [key, value] of formData.entries()) {
            // console.log(`${key}: ${value}`);
            if(key in data){
                if(Array.isArray(data[key])){
                    data[key].push(value)
                }
                else {
                    const temp = [data[key]]
                    temp.push(value)
                    data[key] = temp
                    
                }
            }
            else {
                data[key] = value
            }
          }
        // const data = Object.fromEntries(formData.entries()); // Convert to an object
        console.log("Form Data:", data);
        
        const userEmail = localStorage.getItem('auth')
        const responses = JSON.parse(localStorage.getItem(`responses_${userEmail}`) || "{}")
        const currentForm:string = localStorage.getItem('currentForm') || ""
        if(currentForm in responses){
            responses[currentForm].push(data)
        }
        else {
            responses[currentForm]=[]
            responses[currentForm].push(data)
        }

        localStorage.setItem(`responses_${userEmail}`,JSON.stringify(responses))
        router.push('/')
      };

    return(
        <div className=" h-full w-full flex flex-col items-center p-2">
            <div className=" border-2 border-black w-full md:w-[50%] md:mx-auto flex flex-col gap-2 p-2">
                <p className=" text-2xl">{formObject?.formTitle}</p>
                <p>{formObject?.desc}</p>
            </div>
            <form onSubmit={handleSubmit} className=" flex flex-col w-full md:w-[50%] md:mx-auto p-2 items-start border-2 border-black gap-2">
            {formQuestions[0]?.map((question:QuestionT)=>{
                    let el;
                    // console.log(question?.id)
                    if(question?.answerType==="Text"){
                        return (
                            <div key={question.id} className="border-2 border-black w-full p-2">
                                <p>{question.questionText}</p>
                                <input type="text" name={question.questionText} placeholder="Your Answer"/>
                            </div>
                        )
                    }
                    else if(question?.answerType==="Date"){
                        return (
                            <div key={question?.id} className="border-2 border-black w-full p-2">
                                <p>{question?.questionText}</p>
                                <input type="date" name={question.questionText}/>
                            </div>
                        )
                    }
                    else if(question?.answerType==="Dropdown"){
                        return (
                            <div key={question?.id} className="border-2 border-black w-full p-2">
                                <p>{question?.questionText}</p>
                                <select name={question.questionText}>
                                    {question?.dropDownAnswer?.map((dropdown,index)=>
                                        <option key={index} value={dropdown}>
                                            {dropdown}
                                        </option>
                                    )}
                                </select>
                            </div>
                        )
                    }
                    else if(question?.answerType==="Checkbox"){
                        return (
                            <div key={question?.id} className="border-2 border-black w-full p-2">
                                <p>{question?.questionText}</p>
                                {question?.checkBoxAnswer?.map((checkbox,index)=>(
                                    <div key={index} className=" flex gap-1">
                                        <input type="checkbox" id={String(index)} name={question.questionText} value={checkbox}/>
                                        <label htmlFor={String(index)}>{checkbox}</label>
                                    </div>
                                    

                                ))}
                            </div>
                        )
                    }
                    else if(question?.answerType==="LinearScale"){
                        let start = Number(question?.linearScaleAnswer[0])
                        let end = Number(question?.linearScaleAnswer[1])
                        const elements = []
                        // console.log(start)
                        // console.log(end)
                        for(let i = start;i<=end;++i){
                            elements.push(
                                <div key={i} className=" flex flex-row gap-2">
                                    <input type="radio" id={`${String(i)}`} value={`${String(i)}`} name={question.questionText}/>
                                    <label htmlFor={`${String(i)}`}>{`${String(i)}`}</label>
                                </div>
                            )
                        }
                        return (
                            <div key={question.id} className="border-2 border-black w-full p-2 ">
                                <p>{question?.questionText}</p>
                                {elements}
                            </div>
                        )
                    }
                    
                })}
                <div className=" flex flex-row gap-2 w-full justify-end">
                    <button type="submit" className="border-2 border-black p-2">Submit</button>
                </div>
            </form>
        </div>
    )
}