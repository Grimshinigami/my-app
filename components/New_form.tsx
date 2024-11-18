"use client"
import Link from "next/link"
import { addForm } from "@/lib/features/FormDetails/formSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { FormT } from "@/types/FormType";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

function New_form() {

  const dispatch = useDispatch();

  const [currentForms, setCurrentForms] = useState<FormT[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('auth');

    const temp = localStorage.getItem(`forms_${user}`);

    if(temp){
      setCurrentForms(JSON.parse(temp).forms);
    }

  }, [])


  useEffect(()=>{
    console.log(currentForms);
  },[currentForms])


  function handleRedirect(form:FormT){
    localStorage.setItem('currFormObject',JSON.stringify({form}));
    redirect(`/submitform`);
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
                  <button>Edit</button>
                  <button onClick={()=>handleRedirect(form)}>View</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default New_form