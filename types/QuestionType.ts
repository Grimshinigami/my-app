import { Key } from "react"

export interface QuestionT {
    id:Key,
    questionText:String,
    textAnswer:String,
    dateAnswer:String,
    dropDownAnswer:String[],
    checkBoxAnswer:String[],
    linearScaleAnswer:String[],
    answerType:String,
    req:boolean,
    formId:string|null,
    userId:string|null
}