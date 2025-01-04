import { auth } from "@/auth"
import { redirect } from "next/navigation";
import BlogForm from "@/components/ui/BlogForm";

const CreateBlogPage = async () => {
    const session = await auth();
    if(!session) redirect("/")
  return (
    <>
    <section className="fresh-container !min-h-[230px]">
        <h1 className="heading">Create Your Blog</h1>
    </section>
    <BlogForm />
    </>
  )
}

export default CreateBlogPage