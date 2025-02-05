// app\page.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createUser } from './actions';
import User from "./comp/userhandle";
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth(); // Use useAuth hook to get userId

  useEffect(() => {
    if (isLoaded && userId) {
      // Automatically create user in the database
      createUser();

      // Redirect the user to their dashboard (dynamic page based on userId)
      router.push('/pages/dashboard/');
    }
  }, [userId, isLoaded, router]);

  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed top-5 right-5'>
          <UserButton />
        </div>

        <User />
      </div>
    </main>
  );
}
