
export interface ChallengeConfig {
  id: string;
  answer: string; // For login (stage 0), this is the password. Username 'admin' is implied.
  promptText?: string; // Text to display as the question/prompt for stage > 0
  inputPlaceholder?: string; // Placeholder for input field for stage > 0
  flagKey: string; // Environment variable key for the flag secret
}

export const challenges: ChallengeConfig[] = [
  {
    id: 'login_access',
    answer: 'Sup3rS3cr3tP@$$', // Password for username 'admin'
    flagKey: 'NEXT_PUBLIC_CHALLENGE_0_FLAG_SECRET',
  },
  {
    id: 'archive_key_retrieval',
    answer: 'OpenSesame123',
    promptText: 'Enter the access key for the data archive:',
    inputPlaceholder: 'Access Key',
    flagKey: 'NEXT_PUBLIC_CHALLENGE_1_FLAG_SECRET',
  }
];
