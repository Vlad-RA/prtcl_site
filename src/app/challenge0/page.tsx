// This file is now obsolete and will be removed.
// The first challenge is /src/app/level1/page.tsx.
// The root path / redirects to /level1.
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ObsoleteChallenge0Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/level1');
  }, [router]);
  return null;
}
