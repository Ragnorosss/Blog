import { TBlog } from "@/hooks/useFetchUser";
import { formatDate } from "@/utils/formatData";
import { formatTime } from "@/utils/formatTime";
import { Settings, TimerIcon, User } from "lucide-react";

export default function BlogItem({post}: {post: TBlog }) {
  return (
    <div key={post.id} className='border rounded-lg p-10 transition-all ease-in-out hover:bg-white hover:text-slate-900'>
        <h2>{post.title}</h2>
        <p>{post.desc}</p>
        <p className="flex items-center gap-2"><User/>{post.userNamed}</p>
        <p className="flex items-center gap-2"><TimerIcon/>{formatTime(post.createdAt)}</p> 
        <p className="flex items-center gap-2"><TimerIcon/>{formatDate(post.createdAt)}</p> 
    </div>
  )
}
