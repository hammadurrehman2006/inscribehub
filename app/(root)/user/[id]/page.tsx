import { auth } from "@/auth"
import { BlogCardSkeleton } from "@/components/ui/BlogCard";
import UserBlogs from "@/components/ui/UserBlogs";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export const experimental_ppr = true;
const UserPage = async({params}:{params:Promise<{id:string}>}) => {
    const id = (await params).id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_GITHUB_ID,{id,})
    if(!user) return notFound()
  return (
    <>
    <section className="profile-container">
        <div className="profile-card">
            <div className="profile-title">
    <h3 className="text-24-black uppercase text-center">{user.name}</h3>
            </div>
            <Image 
            src={user.image || 'https://github.com/identicons/github.png'}
            alt={user.name || 'Sample Image'}
            width={220}
            height={220}
            className="profile-image"
             />
             <p className="text-20-medium !text-white text-wrap mt-7 text-center">@{user?.username}</p>
             <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
            <p className="text-30-bold">{session?.id == id ? 'Your' : 'All'} Blogs</p>
            <ul className="card-grid-sm">
                <Suspense fallback={<BlogCardSkeleton/>}>
                <UserBlogs id={id}/>
                </Suspense>
            </ul>
        </div>
    </section>
    </>
  )
}

export default UserPage