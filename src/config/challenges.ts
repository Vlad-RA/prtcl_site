
export interface ChallengeConfig {
  id: string;
  answer: string; // For login (stage 0), this is the password. Username 'admin' is implied.
  promptText?: string; // Text to display as the question/prompt for stage > 0
  inputPlaceholder?: string; // Placeholder for input field for stage > 0
}

export const challenges: ChallengeConfig[] = [
  {
    id: 'login_access',
    answer: 'Sup3rS3cr3tP@$$', // Password for username 'admin'
  },
  {
    id: 'archive_key_retrieval',
    answer: 'OpenSesame123',
    promptText: 'Enter the access key for the data archive:',
    inputPlaceholder: 'Access Key',
  }
];
