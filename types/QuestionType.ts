import { Key } from "react"

export interface QuestionT {
    id:Key,
    questionText:string,
    textAnswer:string,
    dateAnswer:string,
    dropDownAnswer:string[],
    checkBoxAnswer:string[],
    linearScaleAnswer:string[],
    answerType:string,
    req:boolean,
    formId:string|null,
    userId:string|null
}