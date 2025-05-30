
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Level1Page() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const challengeConfig = challenges.find(c => c.level === 1);

  useEffect(() => {
    if (isLoaded && challengeConfig) {
      const levelIndex = challengeConfig.level -1;
      if (currentChallengeIndex > levelIndex && currentChallengeIndex < totalChallenges) {
        router.replace(`/level${currentChallengeIndex + 1}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
      // If currentChallengeIndex is 0 (levelIndex for Level 1), stay on this page.
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router, challengeConfig]);

  if (!isLoaded || !challengeConfig || (isLoaded && currentChallengeIndex !== 0)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const [expectedUsername, expectedPassword] = challengeConfig.answer as string[];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === expectedUsername && password === expectedPassword) {
      alert(challengeConfig.flagValue);
      completeChallenge(); 
      window.location.href = '/level2';
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Check comments in page source for a hint!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* login: admin */}
      {/* password: pa$$w0rd123 */}
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">System Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
