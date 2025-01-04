// import Hero from "@/components/ui/Hero";
import { auth } from "@/auth";
import BlogCard, { BlogCardType } from "@/components/ui/BlogCard";
import SearchForm from "@/components/ui/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { BLOG_QUERY } from "@/sanity/lib/queries";


export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const session = await auth();
  const {data:posts} = await sanityFetch({query:BLOG_QUERY, params})

  return (
    <>
      <section className="fresh-container">

        <h1 className="heading">Write. Share. Inspire.</h1>
        <p className="sub-heading !max-w-3xl">"Your Thoughts, Your Voice—Shared with the World."</p>
        <SearchForm />
      </section>
      <section className="section-container">
        <p className="text-30-semibold">{query ? `Search Results for ${query}` : 'All Blogs'}</p>
        <ul className="mt-6 card-grid">
        {posts?.length > 0 ? (
            posts.map((post:BlogCardType) => (
              <BlogCard key={post?._id} post={post} />
          ))):(<p className="no-results">No Blogs found</p>)}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
