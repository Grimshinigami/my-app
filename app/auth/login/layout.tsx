import React from "react";

export const metadata = {
  title: "Login",
  description: "Login/SignUp",
};

export default function CreateLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen w-screen">
        {children}
    </div>
  );
}
