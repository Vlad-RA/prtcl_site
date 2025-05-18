
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Level2Page() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();
  const router = useRouter();
  const [userInput, setUserInput] = useState('');

  const challengeConfig = challenges.find(c => c.level === 2);

  useEffect(() => {
    if (isLoaded) {
      if (currentChallengeIndex < 1) { // Not completed level 1
        router.replace('/level1');
      } else if (currentChallengeIndex > 1 && currentChallengeIndex < totalChallenges) { // Ahead of this level
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { // All completed
        router.replace('/victory');
      }
      // If currentChallengeIndex is 1, stay on this page.
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router]);

  if (!isLoaded || !challengeConfig || (isLoaded && currentChallengeIndex !== 1)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === challengeConfig.answer) {
      const flagSecret = process.env[challengeConfig.flagKey];
      const flagValue = flagSecret ? 'FLAG{' + flagSecret + '}' : "Error: Flag not configured";
      
      toast({
        title: "Access Key Accepted!",
        description: (
          <>
            Correct. Proceeding to next level.
            <br />
            Your flag: <span className="text-success-bright font-bold">{flagValue}</span>
          </>
        ),
        className: "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300",
      });
      setTimeout(() => {
        completeChallenge();
      }, 3000);
    } else {
      toast({
        title: "Incorrect Key",
        description: "The provided access key is not valid.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="secret-access" style={{display: 'none'}}>accesskey-94831</div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Data Archive</CardTitle>
          <CardDescription className="text-center">{challengeConfig.promptText}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="accessKey">Access Key</Label>
              <Input
                id="accessKey"
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
              Submit Key
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
