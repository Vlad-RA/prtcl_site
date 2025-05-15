"use client";

import { useState } from 'react';
import { Challenge } from '@/config/challenges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CipherAssistantDialog } from './cipher-assistant-dialog';
import { Lightbulb, LockKeyhole, CheckCircle, XCircle } from 'lucide-react';

interface ChallengeDetailsProps {
  challenge: Challenge;
  onCorrectAnswer: () => void;
}

export function ChallengeDetails({ challenge, onCorrectAnswer }: ChallengeDetailsProps) {
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === challenge.answer.toLowerCase()) {
      toast({
        title: "Access Granted!",
        description: "Correct answer. Proceeding to the next challenge.",
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
        title: "Access Denied",
        description: "Incorrect answer. Please try again.",
        variant: "destructive",
        action: <XCircle className="text-destructive-foreground" />,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/30">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
           <LockKeyhole /> {challenge.title}
        </CardTitle>
        <CardDescription className="text-md">{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-md border border-dashed border-border">
          <p className="text-lg whitespace-pre-wrap">{challenge.question}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="answer" className="text-sm font-medium">
              Your Answer, Agent:
            </Label>
            <div className="flex items-center space-x-2 mt-1">
                <span className="text-primary text-lg font-semibold">&gt;</span>
                <Input
                    id="answer"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={challenge.placeholder || "Enter your answer here..."}
                    className="flex-grow text-base"
                    autoFocus
                    required
                />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit Answer
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
        {challenge.hint && (
          <div className="flex items-center text-sm text-muted-foreground p-2 bg-muted rounded-md">
            <Lightbulb className="w-4 h-4 mr-2 text-secondary" />
            <span className="font-medium">Hint:</span>&nbsp;{challenge.hint}
          </div>
        )}
        {challenge.type === 'cipher' && (
          <CipherAssistantDialog 
            initialHint={challenge.hint} 
            initialCipher={challenge.question.startsWith("Decrypt: ") ? challenge.question.substring(9) : ""}
            triggerClassName="w-full sm:w-auto"
          />
        )}
      </CardFooter>
    </Card>
  );
}
