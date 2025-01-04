import { client } from "@/sanity/lib/client"
import { Author_BLOGS_QUERY } from "@/sanity/lib/queries"
import BlogCard, { BlogCardType } from "./BlogCard"
import { Heading1 } from "lucide-react";

const UserBlogs = async ({ id }: { id: string }) => {
    const blogs = await client.fetch(Author_BLOGS_QUERY, {id});
    return (
        <>
            {blogs.length > 0 ? blogs.map((blog) => (
        <BlogCard key={blog._id} post={blog as unknown as BlogCardType}/>    
        )) : (
            <p className="no-result">no posts yet</p>
        )}

        </>)
    
};

export default UserBlogs