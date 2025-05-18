
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

export default function Level5Page() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  // const { toast } = useToast(); // Toast might not be used if page breaks
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [isOverflowed, setIsOverflowed] = useState(false);

  const challengeConfig = challenges.find(c => c.level === 5);

  useEffect(() => {
    if (isLoaded && !isOverflowed) { // Only redirect if not in overflow state
      if (currentChallengeIndex < 4) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex > 4 && currentChallengeIndex < totalChallenges) { 
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router, isOverflowed]);

  if (!isLoaded || !challengeConfig || (isLoaded && currentChallengeIndex !== 4 && !isOverflowed)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }
  
  const flagSecret = challengeConfig ? process.env[challengeConfig.flagKey] : null;
  const flagValue = flagSecret ? 'FLAG{' + flagSecret + '}' : "Error: Flag not configured";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check for very long string (e.g., > 100 characters)
    if (userInput.length > 100) {
      setIsOverflowed(true);
      // Simulate visual break
      if (document.body) {
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #111; color: #0f0; font-family: monospace; padding: 20px; font-size: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <h1>Error: buffer_overflow_detected</h1>
            <p style="color: #0f0; font-size: 20px; margin-top: 20px;">${flagValue}</p>
            <p style="margin-top: 20px;">Redirecting...</p>
          </div>
        `;
      }
      setTimeout(() => {
        completeChallenge();
        // Router might not work if body is replaced, ensure progress is saved
        // The useEffect will handle navigation on next load if router fails here
        router.push(`/level6`); 
      }, 3000);
    } else {
      const { toast } = useToast(); // Get toast here as it's conditional
      toast({
        title: "Input Normal",
        description: "The system processed the input normally. No overflow detected.",
        variant: "default",
      });
    }
  };
  
  if (isOverflowed) {
    // Component is effectively "broken", content managed by direct DOM manipulation
    return null; 
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">System Input</CardTitle>
          <CardDescription className="text-center">{challengeConfig.promptText}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="overflowInput">Access Code</Label>
              <Input
                id="overflowInput"
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
              Submit Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
