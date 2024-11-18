import { Key } from "react";
import { QuestionT } from "./QuestionType";

export interface FormT{
    id:Key,
    formTitle:string,
    desc:string,
    questions: QuestionT[],
    userId:string|null
}