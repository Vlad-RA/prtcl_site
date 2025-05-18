
"use client";

import { useState } from 'react';
import { type ChallengeConfig } from '@/config/challenges'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface ChallengeDetailsProps {
  config: ChallengeConfig;
  onCorrectAnswer: () => void;
}

export function ChallengeDetails({ config, onCorrectAnswer }: ChallengeDetailsProps) {
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is the explicit check for the second challenge's answer, easily discoverable by inspecting client-side code.
    // The config.answer is used for flag generation and other challenges, but this one has a hardcoded check for discoverability.    
    const normalizedUserInput = userInput.trim().toLowerCase();
    
    const isCorrect = config.id === 'archive_key_retrieval' 
      ? userInput.trim().toLowerCase() === "OpenSesame123".toLowerCase()
      : Array.isArray(config.answer)
        ? config.answer.map(ans => ans.toLowerCase()).includes(normalizedUserInput)
        : normalizedUserInput === config.answer.toLowerCase();


    if (isCorrect) {
      const flagSecret = process.env[config.flagKey];
      const flagValue = flagSecret ? 'flag{' + flagSecret + '}' : "Error: Flag not configured";
      
      toast({
        title: "Correct! Flag Acquired!",
        description: (
          <>
            Proceeding to the next step.
            <br />
            Your flag: <span className="text-success-bright font-bold">{flagValue}</span>
          </>
        ),
        className: "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300",
        action: <CheckCircle className="text-green-500 dark:text-green-400" />,
      });
      // Delay to allow toast to be seen
      setTimeout(() => {
        onCorrectAnswer();
        setUserInput('');
      }, 1500);
    } else {
      toast({
        title: "Incorrect",
        description: "Please try again.",
        variant: "destructive",
        action: <XCircle className="text-destructive-foreground" />,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center">Data Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {config.promptText && (
          <div className="p-4 bg-muted/50 rounded-md border border-dashed border-border">
            <p className="text-lg whitespace-pre-wrap">{config.promptText}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="answer" className="text-sm font-medium">
              Your Input:
            </Label>
            <div className="flex items-center space-x-2 mt-1">
                <span className="text-primary text-lg font-semibold">&gt;</span>
                <Input
                    id="answer"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={config.inputPlaceholder || "Enter value..."}
                    className="flex-grow text-base"
                    autoFocus
                    required
                />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
