'use client'
import Link from 'next/link'
import {useState, useEffect} from 'react'
interface IBlogs {
  id: string
  title: string
  desc: string
  userId: string
}[]
export default function Home() {
  const [blogs, setBlogs] = useState<IBlogs[]>([])
  useEffect(() => {
    const response = fetch(`${process.env.NEXT_PUBLIC_BLOG_URL_ALL}`,{
      method: 'GET',
      cache: 'no-cache',
    })
    .then(res => res.json())
    .then(data => setBlogs(data))

  }, [])
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-center font-medium'>Welcome to Blog web-site</h1>
      <p>This is {blogs.length} blogs if you want see others blogs press on button</p>
      <div className='flex flex-wrap gap-10 justify-center my-20'>
      {blogs.map((blog) => ( 
        <div key={blog.id} className='border rounded-lg p-10 transition-all ease-in-out hover:bg-white hover:text-slate-900'>
          <h2>{blog.title}</h2>
          <p>{blog.desc}</p>
          <span>{blog.userId}</span>
        </div>
        ))}
      </div>
        <Link href={'/blog'} className='border rounded-lg px-10 py-2 transition-all ease-in-out hover:bg-white hover:text-slate-900'>See more blogs</Link>
    </main>
  );
}
