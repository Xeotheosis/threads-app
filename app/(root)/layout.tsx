import {ClerkProvider} from "@clerk/nextjs"
import type { Metadata } from "next";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import "../globals.css";

export const metadata = {
  title:"Threads",
  description:"A Next.js 13 Meta Threads Application"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ClerkProvider>
    <html lang="en">
      <body
      >
        <Topbar/>
        <main className="flex flex-row">
          <LeftSidebar/>
          <section className="main-container">
            <div className="w-full max-w-4xl">
            {children}
            </div>
          </section>
          <RightSidebar/>
        </main>
       
        <Bottombar/>
      </body>
    </html>
    </ClerkProvider>
  );
}
