// app/create-form/page.tsx
"use client"
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import Form_creator from "@/components/Form_creator";

export default function CreateFormPage() {
    return (
      <Provider store={store}>
        <Form_creator/>
      </Provider>
    );
  }
  