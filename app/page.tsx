"use client"
import Image from "next/image";
import New_form from "@/components/New_form";
import Form_creator from "@/components/Form_creator";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  
  useEffect(() => {
    const temp = localStorage.getItem('auth')

    if(temp){
      setLogin(true)
    }
    else {
      redirect('/auth/login')
    }

  }, [])
  
  const [login, setLogin] = useState<boolean>(false)
  
  if(!login){
    return (<div>Loading...</div>)
  }

  return (
    <div className=" w-screen h-screen border-2 border-black ">

      <Provider store={store}>
        <New_form/>
      </Provider>
      {/* <Provider store={store}>
        <Form_creator/>
      </Provider> */}
    </div>
  );
}
