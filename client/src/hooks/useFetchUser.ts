'use client'
import { useState, useEffect } from "react";
export type TUser = {
  id: string; // Добавлено
  email: string;
  userName: string;
  updatedAt?: string; // Добавлено
  roles?: string[]; // Добавлено
  posts: TBlog[]; // Изменено на правильное название массива
};

export type TBlog = {
  id: string;
  title: string;
  desc: string;
  createdAt: string; // Добавлено
  userId?: string; // Добавлено
  userNamed: string; // Добавлено
};

  
export default function useFetchUser(email:string) { 
    const [user, setUser] = useState<TUser>();
    const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchUser() {
      const accessToken = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3001/api/user/${email}`, {
        method: 'GET',
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      if (!res.ok) {
        setError('Failed to fetch user data');
        return;
      }

      const userData: TUser = await res.json();
      setUser(userData);
      console.log(userData);
      
      localStorage.setItem('user', JSON.stringify(userData));
    }

    fetchUser();
  }, [email]);

  return {user, error}
}