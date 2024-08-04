import  { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRouter();
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
    
        const res = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });
    
        const data = await res.json();
        console.log(res)
        if (res.ok) {
          console.log('Saving token to localStorage:', data.accessToken); // Отладочное сообщение
          localStorage.setItem('token', data.accessToken);
          route.push(`/user/${email}`);
          
        }
      };
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
        <p className='text-center text-white text-2xl mb-5'>Sign-in</p>
         <form 
            onSubmit={handleSubmit}
            className='flex flex-col border-2 border-white gap-5 p-20'
        >
        <label>Email</label>
          <input 
            type="text" 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='placeholder:text-white px-5 py-1 border rounded-lg bg-transparent'
          />
        <label>Password</label>
        <input 
            type="password" 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='placeholder:text-white px-5 py-1 border rounded-lg bg-transparent'
          />
          <button type='submit' className='placeholder:text-white px-5 py-3 border bg-transparent mt-5'>Log in</button>
    </form>
    </main>
  )
}
