import { createSlice, nanoid } from "@reduxjs/toolkit";
import { FormT } from "@/types/FormType";

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
                questions: [],
                userId: localStorage.getItem("auth")
            };
            state.forms.push(form);
            localStorage.setItem("currForm", form.id);

            // Save to localStorage
            const userForms = JSON.parse(localStorage.getItem(`forms_${userId}`) || '{}');
            if (!userForms.forms) {
                userForms.forms = [];
            }
            userForms.forms.push(form);
            localStorage.setItem(`forms_${userId}`, JSON.stringify(userForms));
        },
        loadUserForms: (state) => {
            const userId = localStorage.getItem("auth");
            if (userId) {
                const userForms = JSON.parse(localStorage.getItem(`forms_${userId}`) || '{}');
                state.forms = userForms.forms || [];
            }
        },
        updateTitle: (state, action) => {
            const userId = localStorage.getItem("auth");
            state.forms = state.forms.map((form) => {
                if (form.id === action.payload.id) {
                    form.formTitle = action.payload.formTitle;
                }
                return form;
            });
            
            // Update localStorage
            const userForms = JSON.parse(localStorage.getItem(`forms_${userId}`) || '{}');
            userForms.forms = state.forms;
            localStorage.setItem(`forms_${userId}`, JSON.stringify(userForms));
        },
        updateDesc: (state, action) => {
            state.forms = state.forms.map((form) => {
                if (form.id === action.payload.id) {
                    form.desc = action.payload.desc;
                }
                return form;
            });
            
            // Update localStorage
            const userId = localStorage.getItem("auth");
            const userForms = JSON.parse(localStorage.getItem(`forms_${userId}`) || '{}');
            userForms.forms = state.forms;
            localStorage.setItem(`forms_${userId}`, JSON.stringify(userForms));
        }
    }
});

export const { addForm, loadUserForms, updateTitle, updateDesc } = formSlice.actions;

export default formSlice.reducer;