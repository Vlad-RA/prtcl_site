
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
    if (isLoaded && challengeConfig) {
      const levelIndex = challengeConfig.level - 1; // 1 for Level 2
      if (currentChallengeIndex < levelIndex) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex > levelIndex && currentChallengeIndex < totalChallenges) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router, challengeConfig]);

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
      alert(challengeConfig.flagValue);
      completeChallenge();
      window.location.href = '/level3';
    } else {
      toast({
        title: "Incorrect Key",
        description: "The provided access key is not valid. Inspect the page elements carefully.",
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
