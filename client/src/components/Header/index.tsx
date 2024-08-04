'use client'
import Link from "next/link";
import { HeaderList, THeaderList } from "./listNav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const path = usePathname();
  const [checkToken, setCheckToken] = useState<boolean>(false);
  const [filteredHeaderList, setFilteredHeaderList] = useState<THeaderList[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserEmail(parsedUser.email); 
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setCheckToken(!!token);

    if (token) {
      setFilteredHeaderList(HeaderList.filter(item => item.named !== 'Sign-in' && item.named !== 'Sign-out'));
    } else {
      setFilteredHeaderList(HeaderList.filter(item => item.named !== 'Account')); 
    }
  }, []);

  const accountLink = userEmail ? `/user/${userEmail}` : '';

  return (
    <header className="pt-5">
      <div className="flex justify-between items-center">
        <span className="font-bold text-[24px]">Blog</span>
        <nav>
          <ul className="flex gap-6 font-bold">
            {filteredHeaderList.map((list) => (
              list.id === 5 && userEmail ? (
                <li key={list.id} className={`text-[20px] border-b-2 border-b-transparent transition-all ease-in-out hover:text-indigo-600 hover:border-b-2 hover:border-b-indigo-600 ${path === list.link ? 'text-indigo-400' : ''}`}>
                  <Link href={accountLink}>{list.named}</Link>
                </li>
              ) : (
                <li key={list.id} className={`text-[20px] border-b-2 border-b-transparent transition-all ease-in-out hover:text-indigo-600 hover:border-b-2 hover:border-b-indigo-600 ${path === list.link ? 'text-indigo-400' : ''}`}>
                  <Link href={list.link}>{list.named}</Link>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
