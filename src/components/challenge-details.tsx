
"use client";

import { useState } from 'react';
import { type ChallengeConfig } from '@/config/challenges'; // Updated import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface ChallengeDetailsProps {
  config: ChallengeConfig; // Updated prop name and type
  onCorrectAnswer: () => void;
}

export function ChallengeDetails({ config, onCorrectAnswer }: ChallengeDetailsProps) {
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === config.answer.toLowerCase()) {
      toast({
        title: "Correct",
        description: "Proceeding to the next step.",
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
        {/* Title can be very generic or derived if needed, for now, keeping it minimal */}
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
      {/* Footer removed as hints and cipher assistant are gone */}
    </Card>
  );
}
