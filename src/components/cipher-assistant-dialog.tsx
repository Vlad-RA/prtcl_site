"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { cipherAssistant, CipherAssistantInput, CipherAssistantOutput } from "@/ai/flows/cipher-assistant";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

interface CipherAssistantDialogProps {
  initialHint?: string;
  initialCipher?: string;
  triggerClassName?: string;
}

export function CipherAssistantDialog({ initialHint = "", initialCipher = "", triggerClassName }: CipherAssistantDialogProps) {
  const [cipherText, setCipherText] = useState(initialCipher);
  const [hint, setHint] = useState(initialHint);
  const [action, setAction] = useState<'encrypt' | 'decrypt'>('decrypt');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CipherAssistantOutput | null>(null);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHint(initialHint);
      setCipherText(initialCipher);
      setResult(null); // Reset result when dialog opens
    }
  }, [isOpen, initialHint, initialCipher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cipherText.trim()) {
      toast({ title: "Input Missing", description: "Please enter some text to process.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const input: CipherAssistantInput = { cipherText, hint, action };
      const aiResult = await cipherAssistant(input);
      setResult(aiResult);
    } catch (error) {
      console.error("Cipher assistant error:", error);
      toast({
        title: "Error",
        description: "Failed to communicate with Cipher Assistant. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}>
          <Wand2 className="mr-2 h-4 w-4" />
          Cipher Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Wand2 /> Cipher Assistant</DialogTitle>
          <DialogDescription>
            Need help with encryption or decryption? This tool is at your service.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6"> {/* Added ScrollArea */}
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <Label htmlFor="action">Action</Label>
              <Select value={action} onValueChange={(value: 'encrypt' | 'decrypt') => setAction(value)}>
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decrypt">Decrypt</SelectItem>
                  <SelectItem value="encrypt">Encrypt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cipherText">Text to {action}</Label>
              <Textarea
                id="cipherText"
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                placeholder={action === 'decrypt' ? "Enter text to decrypt..." : "Enter text to encrypt..."}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="hint">Hint (Optional)</Label>
              <Input
                id="hint"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="e.g., Caesar cipher, key is 'secret'"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                action === 'decrypt' ? 'Decrypt Message' : 'Encrypt Message'
              )}
            </Button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-md space-y-3">
              <h3 className="font-semibold text-lg">Assistant's Report:</h3>
              <div>
                <Label className="font-medium">Result:</Label>
                <p className="p-2 bg-background rounded text-sm break-all">{result.result}</p>
              </div>
              <div>
                <Label className="font-medium">Explanation:</Label>
                <p className="p-2 bg-background rounded text-sm whitespace-pre-wrap">{result.explanation}</p>
              </div>
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="mt-auto pt-4"> {/* Ensure footer is at bottom */}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
