"use client"

export default function CreateSubmitFormPage(){
    
    const formObject = JSON.parse(localStorage.getItem('currFormObject') || '{}');

    console.log(formObject);
    

    return(
        <div className=" h-full w-full">
            <div>

            </div>
            <form action="">

            </form>
        </div>
    )
}