import type { Metadata } from "next";

import "./globals.css";






export const metadata: Metadata = {
  title: "Physio at Home",
  description: "Expert physiotherapy and massage services at your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    <html lang="en">
     
   <body>
 
     
          {children}
    
        </body>
       
    </html>
   
  );
}
