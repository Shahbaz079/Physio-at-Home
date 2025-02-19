import type { Metadata } from "next";

import "./globals.css";
import {
  ClerkProvider,

} from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'
import Header from "@/components/header/Header";



export const metadata: Metadata = {
  title: "Quiz Mania",
  description: "Test Your Knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="en">
     
   <body>
   <ToastContainer />
          <Header/>  
          {children}
      <ToastContainer/>
        </body>
       
    </html>
    </ClerkProvider>
  );
}
