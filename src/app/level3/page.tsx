
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
    if (isLoaded) {
      if (currentChallengeIndex < 2) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex > 2 && currentChallengeIndex < totalChallenges) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router]);

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
      const flagSecret = process.env[challengeConfig.flagKey];
      const flagValue = flagSecret ? 'FLAG{' + flagSecret + '}' : "Error: Flag not configured";
      
      toast({
        title: "Identification Successful!",
        description: (
          <>
            Correct! Moving to the next challenge.
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
        title: "Incorrect Identification",
        description: "That's not the right answer. Try again.",
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
