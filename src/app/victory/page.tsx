
"use client";

import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { VictoryScreen } from '@/components/victory-screen';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VictoryPage() {
  const { currentChallengeIndex, resetProgress, isLoaded, totalChallenges } = useChallengeProgress();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      // If not all challenges are completed, redirect appropriately
      if (currentChallengeIndex < totalChallenges) {
        if (currentChallengeIndex === 0) {
          router.replace('/');
        } else {
          // Redirect to their current challenge page
          router.replace(`/challenge${currentChallengeIndex}`);
        }
      }
      // If currentChallengeIndex >= totalChallenges, they belong here.
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router]);

  if (!isLoaded || (isLoaded && currentChallengeIndex < totalChallenges)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  return <VictoryScreen onRestart={resetProgress} />;
}
