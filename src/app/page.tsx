// This file is intentionally left almost blank.
// The main entry point for the application is now /src/app/challenge0/page.tsx.
// In a production scenario, you might want a redirect here to /challenge0
// or a simple landing page. For this project, we'll assume direct navigation
// to /challenge0 or reliance on the AppHeader link.

"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect from the root to the first challenge page
    router.replace('/challenge0');
  }, [router]);

  // Render a minimal loading state or null while redirecting
  return null; 
}
