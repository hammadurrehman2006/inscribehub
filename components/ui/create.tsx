"use client"
import { Session } from "next-auth"
import { BadgePlus } from "lucide-react"
import Link from "next/link"
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = ({session}:{session:Session}) => {
    const notify = () => {
        if(!session?.user){
          toast.error("Please log in to create a blog!");

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