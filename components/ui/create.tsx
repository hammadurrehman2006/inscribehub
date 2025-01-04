"use client"
import { Session } from "next-auth"
import { BadgePlus } from "lucide-react"
import Link from "next/link"
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = ({session}:{session:Session}) => {
    const notify = () => {
        if(!session?.user){
          toast.success("This is a success message!");
          toast.error("This is an error message!");
          toast.info("This is an info message!");
          toast.warn("This is a warning message!");
        }
      };
  return (
    <>
    <Link href="/blog/create" onClick={notify}>
                                    <span className="max-sm:hidden">Create</span>
                                    <BadgePlus className="sm:hidden size-6"/>
                                </Link>
                                    <ToastContainer/>
    </>
  )
}

export default Create