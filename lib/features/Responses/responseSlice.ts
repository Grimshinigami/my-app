import { createSlice, nanoid } from "@reduxjs/toolkit";
import { ResponseT } from "../../../types/ResponseType";

const responses: ResponseT[] = [];

const initialState = { responses };

export const responseSlice = createSlice({
    name: "responses",
    initialState,
    reducers: {
        addResponse: (state, action) => {
            const response = {
                id: nanoid(),
                formId: action.payload.formId,
                responses: action.payload.responses,
                submittedAt: new Date().toISOString()
            };
            state.responses.push(response);
            
            // Store in localStorage
            const storedResponses = localStorage.getItem("formResponses");
            const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];
            parsedResponses.push(response);
            localStorage.setItem("formResponses", JSON.stringify(parsedResponses));
        },
        loadResponses: (state) => {
            const storedResponses = localStorage.getItem("formResponses");
            if (storedResponses) {
                state.responses = JSON.parse(storedResponses);
            }
        }
    }
});

export const { addResponse, loadResponses } = responseSlice.actions;
export default responseSlice.reducer; 