
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
      // totalChallenges is the number of challenges (e.g., 6).
      // currentChallengeIndex becomes equal to totalChallenges when all are complete (index 6 for 6 challenges).
      if (currentChallengeIndex < totalChallenges) {
          // If not all challenges are completed, redirect to their current level (index + 1 for level number)
          router.replace(`/level${currentChallengeIndex + 1}`);
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

  // onRestart in VictoryScreen now calls resetProgress, which redirects to /level1
  return <VictoryScreen onRestart={resetProgress} />;
}
