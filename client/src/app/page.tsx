import BlogList from '@/components/Post/List';
import Link from 'next/link';

export default function Home() {
  
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-center font-medium'>Welcome to Blog web-site</h1>
      <p>If you want to see more blogs, press the button.</p>
      <div className='flex flex-wrap gap-10 justify-center my-20'>
      <BlogList limit='5'/>
      </div>
      <Link href={'/blog'} className='border rounded-lg px-10 py-2 transition-all ease-in-out hover:bg-white hover:text-slate-900'>See more blogs</Link>
    </main>
  );
}
