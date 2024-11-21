"use client"
import Link from "next/link"
import { addForm, deleteForm } from "@/lib/features/FormDetails/formSlice"
import { useDispatch } from "react-redux"
import { Key, useEffect, useState } from "react";
import { FormT } from "@/types/FormType";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function New_form() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [currentForms, setCurrentForms] = useState<FormT[]>([]);
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    const userEmail = localStorage.getItem('auth');

    const userForms:FormT[] = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"[]")

    if(userForms){
      setCurrentForms([...Object.values(userForms)])
    }

  }, [])


  useEffect(()=>{
    console.log(currentForms);
  },[currentForms])

  useEffect(()=>{
    const userEmail = localStorage.getItem('auth');

    const userForms:FormT[] = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"[]")

    if(userForms){
      setCurrentForms([...Object.values(userForms)])
    }
  },[key])


  function handleViewRedirect(formId:Key){
    const userEmail = localStorage.getItem('auth')
    localStorage.setItem('currentForm',String(formId))
    router.push('/submitform')
    // redirect(`/submitform`);
  }

  function handleEditRedirect(formId:Key){
    const userEmail = localStorage.getItem('auth')
    localStorage.setItem('currentForm',String(formId))
    router.push('/createform')
    // redirect('/createform')
  }

  function handleDeleteForm(formId:Key){
    dispatch(deleteForm({formId:String(formId)}))
    setKey(key=>key+1)
  }

  return (
    <div className=" w-full h-full flex flex-col">
        <div className="h-[10%] border-2 border-red-300">
            Form Header
        </div>
        <div className=" h-[20%] border-2 border-yellow-300">
            <Link href='/createform' onClick={()=>dispatch(addForm({}))}>Create Form</Link>
        </div>
        <div className=" flex-1 border-2 border-green-300 flex flex-col md:flex-row  gap-4 p-2">
            {/* <div className="flex flex-col w-[80%] md:w-[20%] md:h-[20%] gap-4 border-2 border-black">
              <div>
                <p>Form Name</p>
                <p>Form Description</p>
                <div className=" flex flex-row gap-2">
                  <button>Edit</button>
                  <button>View</button>
                  <button>Delete</button>
                </div>
              </div>
            </div> */}
            {currentForms.map((form,index)=>(
              <div key={index} className="flex flex-col w-[80%] md:w-[20%] md:h-[20%] gap-4 border-2 border-black">
              <div>
                <p>{form.formTitle}</p>
                <p>{form.desc}</p>
                <div className=" flex flex-row gap-2">
                  <button onClick={()=>handleEditRedirect(form.id)}>Edit</button>
                  <button onClick={()=>handleViewRedirect(form.id)}>Fill Form</button>
                  <button onClick={()=> handleDeleteForm(form.id)}>Delete</button>
                </div>
              </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default New_form