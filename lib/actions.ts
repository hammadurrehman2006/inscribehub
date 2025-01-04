"use server";

import { auth } from "@/auth";
import { parseServerAction } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/w-client";

export const createBlog = async (
  state: any,
  form: FormData,
  blog: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerAction({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const Blog = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      blog,
    };

    const result = await writeClient.create({ _type: "blog", ...Blog });

    return parseServerAction({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerAction({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};