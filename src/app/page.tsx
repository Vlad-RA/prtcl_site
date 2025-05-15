"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { ChallengeDetails } from '@/components/challenge-details';
import { VictoryScreen } from '@/components/victory-screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function CodeQuestPage() {
  const { currentChallengeIndex, completeChallenge, resetProgress, isLoaded, totalChallenges } = useChallengeProgress();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const isVictory = currentChallengeIndex >= totalChallenges;
  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center">
      {isVictory ? (
        <VictoryScreen onRestart={resetProgress} />
      ) : currentChallenge ? (
        <div className="w-full flex flex-col items-center space-y-6">
          <ChallengeDetails
            challenge={currentChallenge}
            onCorrectAnswer={completeChallenge}
          />
          <div className="mt-auto pt-4">
             <p className="text-xs text-muted-foreground">
              Challenge {currentChallengeIndex + 1} of {totalChallenges}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 p-8">
          <h2 className="text-2xl font-semibold text-destructive">Error: Challenge Not Found</h2>
          <p>There seems to be an issue loading the current challenge. You can try resetting your progress.</p>
          <Button onClick={resetProgress} variant="destructive">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Progress
          </Button>
        </div>
      )}
    </div>
  );
}
