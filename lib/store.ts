import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import QuestionReducer from './features/Questions/questionSlice'
import FormReducer from './features/FormDetails/formSlice'
import ResponseReducer from './features/Responses/responseSlice'

export const store = configureStore({
  reducer: {questions:QuestionReducer, forms:FormReducer, responses:ResponseReducer}
});