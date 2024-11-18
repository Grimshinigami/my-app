"use client"

import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateSignUpPage() {

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const updatedArray = JSON.parse(localStorage.getItem("Users") || "[]");
        updatedArray.push(...updatedArray,{email,password})
        console.log(updatedArray)
        localStorage.setItem("Users", JSON.stringify(updatedArray));
        localStorage.setItem("auth",email)
        redirect('/')

    }

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-[50%]">
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4 border-2 border-black p-20">
                <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit" >Submit</button>
            </form>
        </div>
      </div>
    );
  }
  