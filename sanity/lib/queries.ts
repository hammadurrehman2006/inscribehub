import { defineQuery } from "next-sanity";

export const BLOG_QUERY = defineQuery(`*[_type == "blog" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
author -> {
_id, name, image, bio},
views,
description,
category,
image    }`

);
export const Author_BLOGS_QUERY = defineQuery(`*[_type == "blog" && defined(slug.current) && author._ref == $id] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
author -> {
_id, name, image, bio},
views,
description,
category,
image    }`

);
export const BLOG_Q = `*[_type == "blog" && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, 
      name,
      username,
      image, 
      bio
    },
    views,
    description,
    category,
    image,
    blog,
  }`;
  export const BLOG_VIEWS = `*[_type == "blog" && _id == $id][0]{
  _id, views
  }`;
  export const AUTHOR_BY_PROVIDER_ID = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);
export const Author_By_Id = `*[_type == "author" && _id == $id][0]{
  _id, id, name, username, email, image, bio
}`;
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    blog
  }
}`);