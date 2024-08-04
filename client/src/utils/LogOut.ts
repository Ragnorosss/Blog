// LogOut.ts
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function LogOut(router: AppRouterInstance) {
    return async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_USER_LOGOUT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (res.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
        }
    };
}
