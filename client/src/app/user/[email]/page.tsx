'use client';
import BlogItem from '@/components/Post/Item';
import useFetchUser, { TBlog, TUser } from '@/hooks/useFetchUser';
import LogOut from '@/utils/LogOut';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserProfile = ({ params }: { params: { email: string } }) => {
  const router = useRouter();
  const { email } = params; 
  const { user, error } = useFetchUser(email);
  const logOutTest =  LogOut(router);
  if (error) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className='flex justify-between'>
      <div className='flex flex-col gap-5'>
        <h1>Profile: {user?.userName}</h1>
        <User size={128}/>
        <p className='text-md font-medium'>Email: {user?.email}</p>
        <p className='text-md font-medium'>Username: {user?.userName}</p>
        <p className='text-md font-medium'>Post create: {user?.posts.length}</p>
        <button 
          type="button" 
          onClick={logOutTest}
          className='border rounded-lg p-5 transition-all ease-in-out hover:bg-white hover:text-slate-900'
          >Log out</button>
      </div>
      <div className='flex flex-col gap-10 w-full max-w-[80%]'>
        <h2 className='text-2xl my-10'>Your Posts:</h2>
        {user?.posts?.length ? (
            user.posts.map((post: TBlog) => (
            <BlogItem key={post.id} post={post}/>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
