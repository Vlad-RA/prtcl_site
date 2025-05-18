
"use client";

import { challenges } from '@/config/challenges';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { ChallengeDetails } from '@/components/challenge-details';
import { VictoryScreen } from '@/components/victory-screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SystemAccessPage() {
  const { currentChallengeIndex, completeChallenge, resetProgress, isLoaded, totalChallenges } = useChallengeProgress();
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Reset login form fields when switching away from login stage
    if (currentChallengeIndex !== 0) {
      setUsername('');
      setPassword('');
    }
  }, [currentChallengeIndex]);

  if (!isLoaded) {
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

  const currentConfig = challenges[currentChallengeIndex];
  const isVictory = currentChallengeIndex >= totalChallenges;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Hint for Login Stage (Stage 0) */}
      {currentChallengeIndex === 0 && (
         <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', left: '-9999px', top: '-9999px' }} dangerouslySetInnerHTML={{ __html: "<!-- Username: admin, Password: Sup3rS3cr3tP@$$ -->" }} />
      )}

      {/* The explicit answer for stage 1 is now directly in challenge-details.tsx for easy inspection */}

      {isVictory ? (
        <VictoryScreen onRestart={resetProgress} />
      ) : currentChallengeIndex === 0 ? (
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
      ) : currentConfig ? (
        <div className="w-full flex flex-col items-center space-y-6">
          <ChallengeDetails
            config={currentConfig}
            onCorrectAnswer={completeChallenge}
          />
        </div>
      ) : (
        <div className="text-center space-y-4 p-8">
          <h2 className="text-2xl font-semibold text-destructive">Error: Content Not Found</h2>
          <p>There was an issue loading the content. You can try resetting.</p>
          <Button onClick={resetProgress} variant="destructive">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      )}
    </div>
  );
}
