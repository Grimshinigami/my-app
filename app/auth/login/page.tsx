"use client"
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateLoginPage() {

  function handleSubmit(e:React.FormEvent){
      e.preventDefault();
      const storedArray = JSON.parse(localStorage.getItem("Users") || "[]");
      let check = false;
      for(let i=0;i<storedArray.length;++i){
        if(storedArray[i].email==email && storedArray[i].password==password){
          localStorage.setItem("auth",storedArray[i].email)
          check=true;
          redirect('/')
        }
      }
      setChecker(false)

  }

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checker, setChecker] = useState<boolean> (true)

    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-[50%]">
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4 border-2 border-black p-20">
                <input type="text" placeholder="Username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <p>Create Account? <Link href="/auth/signup">Signup</Link></p>
            </form>
            {!checker && <p>Wrong username or password try again</p>}
        </div>
      </div>
    );
  }
  