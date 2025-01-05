import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(25),
  link: z.string().url().refine(async(url) =>{ 
    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentType = res.headers.get("content-type") || "";
      const urlPath = new URL(url).pathname;
      const isImage = Boolean(
        contentType.match(/^image\//i) || 
        urlPath.match(/\.(jpg|png|jpeg|webp|gif|svg|bmp|tiff|ico|cur)$/i)
      );
      
      return isImage;
    } catch {
      return false;
    }
}),
blog: z.string().min(10)
});


