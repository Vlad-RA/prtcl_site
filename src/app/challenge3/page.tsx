
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { ChallengeDetails } from '@/components/challenge-details';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Challenge3Page() {
  const { currentChallengeIndex, completeChallenge, resetProgress, isLoaded, totalChallenges } = useChallengeProgress();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (currentChallengeIndex === 0) { 
        router.replace('/challenge0');
      } else if (currentChallengeIndex < 3) { 
         router.replace(currentChallengeIndex === 0 ? '/challenge0' : `/challenge${currentChallengeIndex}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
      // If currentChallengeIndex is > 3, they've passed this, so redirect to their current challenge
      else if (currentChallengeIndex > 3) {
        router.replace(`/challenge${currentChallengeIndex}`);
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router]);

  if (!isLoaded || (isLoaded && currentChallengeIndex !== 3)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const currentConfig = challenges[3];

  if (!currentConfig) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-4 p-8">
            <h2 className="text-2xl font-semibold text-destructive">Error: Challenge Not Found</h2>
            <p>There was an issue loading the challenge content. You can try resetting.</p>
            <Button onClick={resetProgress} variant="destructive">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset to Login
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full flex flex-col items-center space-y-6">
        <ChallengeDetails
          config={currentConfig}
          onCorrectAnswer={completeChallenge}
        />
      </div>
    </div>
  );
}
