// Cipher assistant to help encrypt or decrypt messages.

'use server';

/**
 * @fileOverview A cipher assistant AI agent.
 *
 * - cipherAssistant - A function that handles the cipher assistance process.
 * - CipherAssistantInput - The input type for the cipherAssistant function.
 * - CipherAssistantOutput - The return type for the cipherAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CipherAssistantInputSchema = z.object({
  cipherText: z.string().describe('The cipher text to be decrypted or encrypted.'),
  hint: z.string().describe('A hint to help with the decryption or encryption.'),
  action: z
    .enum(['encrypt', 'decrypt'])
    .describe('Whether to encrypt or decrypt the cipher text.'),
});
export type CipherAssistantInput = z.infer<typeof CipherAssistantInputSchema>;

const CipherAssistantOutputSchema = z.object({
  result: z.string().describe('The result of the encryption or decryption.'),
  explanation: z
    .string()
    .describe('An explanation of how the encryption or decryption was performed.'),
});
export type CipherAssistantOutput = z.infer<typeof CipherAssistantOutputSchema>;

export async function cipherAssistant(input: CipherAssistantInput): Promise<CipherAssistantOutput> {
  return cipherAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cipherAssistantPrompt',
  input: {schema: CipherAssistantInputSchema},
  output: {schema: CipherAssistantOutputSchema},
  prompt: `You are a cipher expert. You will either encrypt or decrypt the provided cipher text based on the user's instructions and hint.

  Action: {{{action}}}
  Hint: {{{hint}}}
  Cipher Text: {{{cipherText}}}

  Provide the result and a detailed explanation of how you arrived at the result.  Be as clear and concise as possible.`,
});

const cipherAssistantFlow = ai.defineFlow(
  {
    name: 'cipherAssistantFlow',
    inputSchema: CipherAssistantInputSchema,
    outputSchema: CipherAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
