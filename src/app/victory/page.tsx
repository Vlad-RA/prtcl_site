
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
      if (currentChallengeIndex < totalChallenges) {
        // If not all challenges are completed, redirect to the current challenge or login
        if (currentChallengeIndex === 0) {
          router.replace('/');
        } else {
          // Attempt to go to the specific challenge page if defined, otherwise back to login
          // For now, simplified: if not 0 and not total, means they are on some challenge page.
          // But since this is victory, and they aren't at `totalChallenges`, they shouldn't be here.
          router.replace(`/challenge${currentChallengeIndex}` as string); // or simply '/'
        }
      }
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

  return <VictoryScreen onRestart={resetProgress} />; // resetProgress now navigates to '/'
}
