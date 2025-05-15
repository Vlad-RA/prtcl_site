"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, RefreshCw } from "lucide-react";

interface VictoryScreenProps {
  onRestart: () => void;
}

export function VictoryScreen({ onRestart }: VictoryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4 text-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="items-center">
          <Award className="w-16 h-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Congratulations, Agent!</CardTitle>
          <CardDescription className="text-lg">
            You have successfully completed all CodeQuest challenges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>Your skills in decryption and deduction are exceptional. The mission is a success!</p>
          <p className="text-success-bright font-semibold text-xl">ALL SYSTEMS: SECURE</p>
          <Button onClick={onRestart} size="lg" className="w-full bg-secondary hover:bg-secondary/90">
            <RefreshCw className="mr-2 h-5 w-5" />
            Restart Challenges
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
