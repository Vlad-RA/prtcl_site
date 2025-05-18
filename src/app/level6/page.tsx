
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Level6Page() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();
  const router = useRouter();
  const [userInput, setUserInput] = useState('');

  const challengeConfig = challenges.find(c => c.level === 6);

  useEffect(() => {
    if (isLoaded && challengeConfig) {
      const levelIndex = challengeConfig.level - 1; // 5 for Level 6
      if (currentChallengeIndex < levelIndex) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex > levelIndex && currentChallengeIndex < totalChallenges) { // Should not happen if totalChallenges is 6
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { // Already completed all
        router.replace('/victory');
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router, challengeConfig]);

  if (!isLoaded || !challengeConfig || (isLoaded && currentChallengeIndex !== 5)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-64 w-full max-w-lg mb-4" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === challengeConfig.answer) {
      alert(challengeConfig.flagValue);
      completeChallenge();
      window.location.href = '/victory';
    } else {
      toast({
        title: "Incorrect IP",
        description: "That IP doesn't seem to be the one we're looking for. Check the logs again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log Analysis</CardTitle>
          <CardDescription className="text-center pt-2">{challengeConfig.promptText}</CardDescription>
        </CardHeader>
        <CardContent>
          {challengeConfig.logData && (
            <ScrollArea className="h-48 w-full rounded-md border p-4 bg-muted/50 mb-6">
              <pre className="text-sm whitespace-pre-wrap">
                {challengeConfig.logData.join('\n')}
              </pre>
            </ScrollArea>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="logAnswer">Identified IP</Label>
              <Input
                id="logAnswer"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={challengeConfig.inputPlaceholder}
                required
                autoFocus
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit IP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
