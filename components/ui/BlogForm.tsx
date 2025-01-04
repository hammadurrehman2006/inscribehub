"use client"

import { useActionState, useState } from "react"
import { Input } from "./input"
import { Textarea } from "./textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createBlog } from "@/lib/actions"


const BlogForm = () => {
        const [error, setError] = useState<Record<string, string>>({});
        const [blog, setBlog] = useState("");
        const { toast } = useToast();
        const router = useRouter();
      
        const handleFormSubmit = async (prevState: any, formData: FormData) => {
          try {
            const formValues = {
              title: formData.get("title") as string,
              description: formData.get("description") as string,
              category: formData.get("category") as string,
              link: formData.get("link") as string,
              blog,
            };
      
            await formSchema.parseAsync(formValues);
      
            const result = await createBlog(prevState, formData, blog);
      
            if (result.status == "SUCCESS") {
              toast({
                title: "Success",
                description: "Your blog has been created successfully",
              });
      
              router.push(`/blog/${result._id}`);
            }
      
            return result;
          } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErorrs = error.flatten().fieldErrors;
      
              setError(fieldErorrs as unknown as Record<string, string>);
      
              toast({
                title: "Error",
                description: "Please check your inputs and try again",
                variant: "destructive",
              });
      
              return { ...prevState, error: "Validation failed", status: "ERROR" };
            }
      
            toast({
              title: "Error",
              description: "An unexpected error has occurred",
              variant: "destructive",
            });
      
            return {
              ...prevState,
              error: "An unexpected error has occurred",
              status: "ERROR",
            };
          }
        };
      
        const [state, formAction, isPending] = useActionState(handleFormSubmit, {
          error: "",
          status: "INITIAL",
        });
      

    return (<>
        <form action={formAction} className="blog-form">
            <div>
                <label htmlFor="title" className="blog-form-label">Title</label>
                <Input type="text" name="title" id="title" className="blog-form-input" placeholder="Blog Title" />
                {error.title && <p className="blog-form-error">{error.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="blog-form-label">Description</label>
                <Textarea name="description" id="description" className="blog-form-textarea" placeholder="Blog Description" />
                {error.description && <p className="blog-form-error">{error.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="blog-form-label">Category</label>
                <Input type="text" name="category" id="category" className="blog-form-input" placeholder="Blog Category (Science, Technology, Education, ....)" />
                {error.category && <p className="blog-form-error">{error.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="blog-form-label">Image Link</label>
                <Input type="text" name="link" id="link" className="blog-form-input" placeholder="Blog Image URL" />
                {error.link && <p className="blog-form-error">{error.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="link" className="blog-form-label">Blog Content</label>
                <MDEditor
                    value={blog}
                    onChange={(e) => setBlog(e as string)}
                    id="blog-content"
                    preview="edit"
                    height={320}
                    style={{ borderRadius: 24, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Write your blog content here..."
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {error.link && <p className="blog-form-error">{error.link}</p>}
            </div>
            <Button type="submit" disabled={isPending} className="blog-form-btn">{isPending ? "Submitting..." : "Submit Your Blog"}<Send className="size-6 ml-2" /></Button>

        </form>
    </>
    )
}

export default BlogForm
