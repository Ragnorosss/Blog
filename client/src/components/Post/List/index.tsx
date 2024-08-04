'use client';
import { IBlog } from "@/types/blog";
import { useEffect, useState } from "react";
import BlogItem from "../Item";

interface BlogListProps {
  limit?: string; // 
}

export default function BlogList({ limit }: BlogListProps) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  
  useEffect(() => {
    // Форматируем строку запроса
    const url = new URL(process.env.NEXT_PUBLIC_BLOG_URL_ALL as string);
    if (limit) {
      url.searchParams.append('limit', limit); 
    }
    
    fetch(url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    })
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Fetch error: ", err)); 
  }, [limit]); 

  return (
    <>
      {blogs.map((blog: IBlog) => ( 
        <BlogItem key={blog.id} post={blog} />
      ))}
    </>
  );
}
