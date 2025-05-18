
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

export default function LoginPage() {
  const { currentChallengeIndex, completeChallenge, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoaded) {
      if (currentChallengeIndex > 0 && currentChallengeIndex < totalChallenges) {
        router.replace(`/challenge${currentChallengeIndex}`);
      } else if (currentChallengeIndex >= totalChallenges) { 
        router.replace('/victory');
      }
      // If currentChallengeIndex is 0, stay on this page.
    }
  }, [isLoaded, currentChallengeIndex, totalChallenges, router]);

  if (!isLoaded || (isLoaded && currentChallengeIndex !== 0)) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-40 w-full max-w-md" />
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedUsername = "admin";
    const currentChallengeConfig = challenges[0]; // Login challenge is always the first
    const expectedPassword = currentChallengeConfig.answer;

    if (username === expectedUsername && password === expectedPassword) {
      const flagSecret = process.env[currentChallengeConfig.flagKey];
      const flagValue = flagSecret ? 'flag{' + flagSecret + '}' : "Error: Flag not configured";
      
      toast({
        title: "Login Successful! Flag Acquired!",
        description: (
          <>
            Access granted to the next area.
            <br />
            Your flag: <span className="text-success-bright font-bold">{flagValue}</span>
          </>
        ),
        className: "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300",
      });
      setTimeout(() => {
        completeChallenge(); 
      }, 1500);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Hint for Login Stage (Stage 0): Username: admin, Password: Sup3rS3cr3tP@$$ */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', left: '-9999px', top: '-9999px' }} dangerouslySetInnerHTML={{ __html: "<!-- Username: admin, Password: Sup3rS3cr3tP@$$ -->" }} />
      
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
