
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, RefreshCw } from "lucide-react"; // Changed Icon

interface VictoryScreenProps {
  onRestart: () => void;
}

export function VictoryScreen({ onRestart }: VictoryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4 text-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="items-center">
          <CheckCircle className="w-16 h-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Access Granted</CardTitle>
          <CardDescription className="text-lg">
            All security checks passed. System is now accessible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-green-500 dark:text-green-400 font-semibold text-xl">SYSTEM ONLINE</p>
          <Button onClick={onRestart} size="lg" className="w-full">
            <RefreshCw className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
