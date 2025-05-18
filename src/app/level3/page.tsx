
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
import Image from 'next/image';

export default function Level3Page() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();
  const router = useRouter();
  const [userInput, setUserInput] = useState('');

  const challengeConfig = challenges.find(c => c.level === 3);

  useEffect(() => {
    if (isLoaded && challengeConfig) {
      const levelIndex = challengeConfig.level - 1; // 2 for Level 3
      if (currentChallengeIndex < levelIndex) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex > levelIndex && currentChallengeIndex < totalChallenges) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router, challengeConfig]);

  if (!isLoaded || !challengeConfig || (isLoaded && currentChallengeIndex !== 2)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-64 w-full max-w-md mb-4" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === (challengeConfig.answer as string).toLowerCase()) {
      alert(challengeConfig.flagValue);
      completeChallenge();
      window.location.href = '/level4';
    } else {
      toast({
        title: "Incorrect Identification",
        description: "That's not the right answer. Try a reverse image search or other OSINT techniques.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">OSINT Challenge</CardTitle>
          {challengeConfig.imageUrl && (
             <div className="my-4 flex justify-center">
               <Image 
                src={challengeConfig.imageUrl} 
                alt="OSINT Challenge Image" 
                width={600} 
                height={400} 
                className="rounded-md object-contain max-h-[300px] w-auto"
                data-ai-hint="company headquarters"
                />
             </div>
          )}
          <CardDescription className="text-center pt-2">{challengeConfig.promptText}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="osintAnswer">Your Answer</Label>
              <Input
                id="osintAnswer"
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
              Submit Answer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
