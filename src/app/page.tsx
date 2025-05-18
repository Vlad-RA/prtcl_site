"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect from the root to the first challenge page
    router.replace('/level1');
  }, [router]);

  // Render a minimal loading state or null while redirecting
  return null; 
}
