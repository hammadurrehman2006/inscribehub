import BlogCard, { BlogCardType } from "@/components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/ui/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { BLOG_Q, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(BLOG_Q, { id });
  const editorPosts = (await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new"}))?.select || [];
  const parseMd = MarkdownIt().render(post?.blog||" ")


  if (!post) return notFound();
 


  return (
      <>
        <section className="fresh-container !min-h-[230px]">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
        </section>
        <section className="section-container">
          <Image src={post.image} alt="thumbnail" width={1000} height={1000} className="aspect-video object-cover w-full rounded-xl" />
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
<div className="flex-between gap-5">
  <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
  <Image src={post.author?.image || 'https://github.com/shadcn.png'} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg"/>
  <div>
  <p className="text-20-medium">{post.author?.name}</p>
  <p className="text-16-medium !text-black-300">@{post.author?.username}</p>
  </div>
  </Link>
  <p className="category-tag">{post.category}</p>
</div>
<h3 className="text-30-bold"> Blog Details</h3>
{parseMd?(
<article className="markdown-body prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parseMd }} />
):(
  <p className="no-result">No Detailsprovided</p>
)
} </div>
 <hr className="divider" />
 {editorPosts.length > 0 ? (
  <div className="max-w-4xl mx-auto">
    <p className="text-30-semibold">Editor Picks</p>
    <ul className="mt-7 card-grid-sm">
      {editorPosts.map((post, i: number) => (
        <BlogCard key={post._id} post={post as unknown as BlogCardType} />
      ))}
    </ul>
  </div>
) : (
  <p className="no-result">No Editor Picks</p>
)}

 <Suspense fallback={<Skeleton className="view-skeleton"/>}>
 <View id={id} />
 </Suspense>
 
 
        </section>
      </>
    );
  }; 

export default Page;