"use client"

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { FormT } from "@/types/FormType";
import { QuestionT } from "@/types/QuestionType";
import {WritableDraft} from 'immer';

const forms: FormT[] = [];

const initialState = { forms };

export const formSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        addForm: (state, action) => {
            const userId = localStorage.getItem("auth");
            const form = {
                id: nanoid(),
                formTitle: "Untitled Form",
                desc: "Form Description",
                questions: {},
                userId: localStorage.getItem("auth")
            };
            state.forms.push(form)

            //Update Local Storage
            localStorage.setItem('currentForm',String(form.id))
            const userEmail = localStorage.getItem('auth')
            const userForms = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")
            userForms[form.id] = form
            localStorage.setItem(`forms_${userEmail}`,JSON.stringify(userForms))

        },
        loadUserForms: (state) => {
            const userId = localStorage.getItem("auth");
            if (userId) {
                const userForms = JSON.parse(localStorage.getItem(`forms_${userId}`) || '{}');
                state.forms = userForms.forms || [];
            }
        },
        updateTitle: (state, action) => {
            // console.log(state.forms)
            state.forms = state.forms.map((form) => {
                console.log(form)
                // console.log(action.payload.formTitle)
                if (form.id === action.payload.id) {
                    form.formTitle = action.payload.formTitle;
                }
                return form;
            });
            console.log(state.forms)
            
        },
        updateDesc: (state, action) => {
            state.forms = state.forms.map((form) => {
                if (form.id === action.payload.id) {
                    form.desc = action.payload.desc;
                }
                return form;
            });
            
        },
        loadFormFromLocal: (state,action) => {
            const userEmail = localStorage.getItem('auth')

            const FormsObject = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")

            if(Object.keys(FormsObject).length!==0){
                const FormsArray = [...Object.values(FormsObject)]
                console.log(FormsArray)
                state.forms = FormsArray 
                console.log(state.forms)
            }
        },
        saveFormToLocal: (state, action) => {

            const userEmail = localStorage.getItem('auth')
            const currentForm = localStorage.getItem('currentForm') || ""
            const LocalFormObject = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")

            const updatedQuestions = action.payload.questions
            const temp = LocalFormObject
            // console.log(temp[currentForm].formTitle)
            // console.log(action.payload.newTitle)
            // console.log(action.payload.newDesc)
            LocalFormObject[currentForm].formTitle = action.payload.newTitle
            LocalFormObject[currentForm].desc = action.payload.newDesc

            // console.log(updatedQuestions)
            LocalFormObject[currentForm].questions={}
            for(let i=0;i<updatedQuestions.length;++i){
                // console.log(updatedQuestions[i].id)
                LocalFormObject[currentForm].questions[updatedQuestions[i].id] = updatedQuestions[i]
            }
            // console.log(LocalFormObject)
            console.log(JSON.stringify(LocalFormObject))
            localStorage.setItem(`forms_${userEmail}`,JSON.stringify(LocalFormObject))
        },
        deleteForm: (state, action) => {
            const userEmail = localStorage.getItem('auth')
            const currentForm = action.payload.formId
            const LocalFormObject = JSON.parse(localStorage.getItem(`forms_${userEmail}`)||"{}")
            const LocalResponseObject = JSON.parse(localStorage.getItem(`responses_${userEmail}`)||"{}")

            // console.log(LocalFormObject)
            delete LocalFormObject[currentForm]
            delete LocalResponseObject[currentForm]
            // console.log(LocalFormObject)
            localStorage.setItem(`forms_${userEmail}`,JSON.stringify(LocalFormObject))
            localStorage.setItem(`responses_${userEmail}`,JSON.stringify(LocalResponseObject))
        }
    }
});

export const { addForm, loadUserForms, updateTitle, updateDesc, loadFormFromLocal, saveFormToLocal, deleteForm } = formSlice.actions;

export default formSlice.reducer;