// app/create-form/layout.tsx

import React from "react";
import { useDispatch } from "react-redux";

export const metadata = {
  title: "Create Form",
  description: "Create and manage forms easily with our intuitive builder.",
};

export default function CreateFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-full w-full">
        {children}
    </div>
  );
}
