'use client'
import Link from "next/link";
import { HeaderList } from "./listNav";
import { usePathname } from "next/navigation";
export default function Header() {
  const path = usePathname();
  console.log(path)
  return (
    <header className="pt-5">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[24px]">Blog</span>
          <nav>
            <ul className="flex gap-6 font-bold">
              {HeaderList.map((list) => (
                <li key={list.id} className={`text-[20px] border-b-2 border-b-transparent transition-all ease-in-out hover:text-indigo-600 hover:border-b-2 hover:border-b-indigo-600 ${path === list.link ? 'text-indigo-400'
                : 
                ''}`}>
                  <Link href={list.link}>{list.named}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    </header>
  )
}
