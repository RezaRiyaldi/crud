"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e:any) => {
      e.preventDefault();

      setIsLoading(true)
      
      await fetch("/api/posts", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            title, content
         })
      }).then((res) => {
         console.log(res);
      }).catch((e) => {
         console.log(e);
      })
      
      setIsLoading(false)
      router.push('/');
   }

   return (
      <div className="flex flex-col min-h-screen justify-center">
         <form action="" className="w-[500px] flex flex-col gap-3 mx-auto">
            <Link href={'/'} className="btn btn-ghost btn-sm me-auto">{'<'} Back</Link>
            <div className="join join-vertical">
               <input type="text" className="input join-item input-secondary" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
               <input className="input input-secondary join-item" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>

            <button className="btn btn-neutral" onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Menyimpan..." : "Save"}</button>

         </form>
      </div>
   )
}