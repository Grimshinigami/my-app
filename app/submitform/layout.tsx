import React from "react"

export default function CreateSubmitFormLayout({ children }: { children: React.ReactNode }){
    return (
        <div className=" h-screen w-screen">
            {children}
        </div>
    )
}