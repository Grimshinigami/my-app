import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Key } from "react";

import { QuestionT } from "@/types/QuestionType";
import { FormT } from "@/types/FormType";
import {WritableDraft} from 'immer';

const questions:QuestionT[] = []

export interface QuestionArr {
    questions:QuestionT[]
}

const initialState = {questions}

export const questionSlice = createSlice({
    name:"Ques",
    initialState,
    reducers: {
        addQues: (state,action) => {
            
            const ques:QuestionT =  {
                id:nanoid(),
                questionText:`Question ${state.questions.length+1}`,
                textAnswer:"",
                answerType:"Text",
                dateAnswer: "",
                dropDownAnswer:["Option 1"],
                checkBoxAnswer: ["Option 1"],
                linearScaleAnswer: ["1","5"],
                formId: localStorage.getItem('currentForm'),
                req:false,
                userId: localStorage.getItem("auth")
            }
            state.questions.push(ques)
            
            //Update Local storage
            const userEmail = localStorage.getItem('auth')
            const currentForm = localStorage.getItem('currentForm')||""
            const userForms = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"[]")
            console.log("Printing from addquestion: ",userForms)
            // userForms[currentForm].questions.push(ques)
            userForms[currentForm].questions[String(ques.id)]=ques
            localStorage.setItem(`forms_${userEmail}`,JSON.stringify(userForms))

        },
        updateQuesText: (state,action) =>{
            state.questions.map((ques)=> {
                if(ques.id===action.payload.id){
                    ques.questionText = action.payload.questionText
                }
                return ques
            })
        },
        updateAnswerType: (state,action) => {
            state.questions.map((ques)=>{
                if(ques.id===action.payload.id){
                    ques.answerType = action.payload.answerType
                    ques.textAnswer = ""
                    ques.dateAnswer = ""
                    ques.dropDownAnswer=["Option 1"]
                    ques.checkBoxAnswer = ["Option 1"]
                    ques.linearScaleAnswer = ["1","5"]
                }
                return ques
            })

        },
        updateQuestionText: (state, action) => {
            state.questions.map((ques)=> {
                if(ques.id==action.payload.id){
                    ques.textAnswer = action.payload.textAnswer
                }
                return ques
            })
        },
        updateQuestionDate: (state, action) => {
            state.questions.map((ques)=> {
                if(ques.id==action.payload.id){
                    ques.textAnswer = action.payload.dateAnswer
                }
                return ques
            })
        },
        addQuesDropdown: (state, action) => {
            state.questions.map((ques)=>{
                if(ques.id == action.payload.id){
                    const temp = String(ques.dropDownAnswer?.length+1)
                    ques.dropDownAnswer?.push("Option "+temp)
                }
                return ques
            })
        },
        addQuesCheckBox: (state, action) => {
            state.questions.map((ques)=>{
                if(ques.id == action.payload.id){
                    const temp = String(ques.checkBoxAnswer?.length+1)
                    ques.checkBoxAnswer?.push("Option "+temp)
                }
                return ques
            })
        },
        updateQuesDropdownVal: (state, action) => {
            state.questions.map((question)=>{
                if(question.id==action.payload.id){
                    question.dropDownAnswer = question.dropDownAnswer?.map((dropDown, i)=>(
                        i===action.payload.index?action.payload.updatedDp:dropDown
                      ))
                }
                return question
            })
        },
        removeQuesDropdownVal: (state,action) => {
            state.questions.map((question)=>{
                if(question.id==action.payload.id){
                    question.dropDownAnswer = question.dropDownAnswer?.filter((_, i)=>(
                        i!==action.payload.index
                      ))
                }
                return question
            })
        },
        updateQuesCheckboxVal: (state, action) => {
            state.questions.map((question)=>{
                if(question.id==action.payload.id){
                    question.checkBoxAnswer = question.checkBoxAnswer?.map((checkBox, i)=>(
                        i===action.payload.index?action.payload.updatedCh:checkBox
                      ))
                }
                return question
            })
        },
        removeQuesCheckBoxVal: (state,action) => {
            state.questions.map((question)=>{
                if(question.id==action.payload.id){
                    question.checkBoxAnswer = question.checkBoxAnswer?.filter((_, i)=>(
                        i!==action.payload.index
                      ))
                }
                return question
            })
        },
        updateLinearScale: (state,action) => {
            state.questions.map((question)=>{
                if(question.id==action.payload.id){
                    if(action.payload.type==='0'){
                        question.linearScaleAnswer[0]=action.payload.updatedVal
                    }
                    else {
                        question.linearScaleAnswer[1]=action.payload.updatedVal
                    }
                }
                return question
            })
        },
        toggleRequired: (state, action) => {
            state.questions.map((question)=> question.id==action.payload.id?question.req=!question.req:question.req)
        },
        deleteQues: (state, action) => {
            state.questions = state.questions.filter((ques)=>(ques.id!==action.payload.id))
        },
        loadFormQuestions: (state, action) => {
            const currentForm = localStorage.getItem("currentForm") || ""
            const userEmail = localStorage.getItem('auth') || "";
            const FormsObject = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")

            if(Object.keys(FormsObject).length!==0){
                // console.log(FormsObject)
                if(Object.keys(FormsObject).length!==0){
                    state.questions = [...Object.values(FormsObject[currentForm].questions)] 
                }
            }

        },

    }
})

export const {
    addQues,
    updateQuesText,
    updateAnswerType,
    updateQuestionText,
    updateQuestionDate,
    addQuesDropdown,
    updateQuesDropdownVal,
    removeQuesDropdownVal,
    addQuesCheckBox,
    updateQuesCheckboxVal,
    removeQuesCheckBoxVal,
    updateLinearScale,
    toggleRequired,
    deleteQues,
    loadFormQuestions,
} = questionSlice.actions

export default questionSlice.reducer