
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
  },
  {
    id: 'network_traffic_analysis',
    answer: 'ProtocolX25',
    promptText: 'Identify the unusual protocol from the network capture:',
    inputPlaceholder: 'Protocol Name',
    flagKey: 'NEXT_PUBLIC_CHALLENGE_2_FLAG_SECRET',
  },
  {
    id: 'log_file_investigation',
    answer: 'ErrorID7749',
    promptText: 'Find the critical error ID in the server logs:',
    inputPlaceholder: 'Error ID',
    flagKey: 'NEXT_PUBLIC_CHALLENGE_3_FLAG_SECRET',
  },
  {
    id: 'server_config_audit',
    answer: 'BackupDisabled',
    promptText: 'What is the misconfigured security setting on the web server?',
    inputPlaceholder: 'Setting Value',
    flagKey: 'NEXT_PUBLIC_CHALLENGE_4_FLAG_SECRET',
  },
  {
    id: 'final_system_key',
    answer: 'SystemOverrideAlpha',
    promptText: 'Enter the final system override key:',
    inputPlaceholder: 'Override Key',
    flagKey: 'NEXT_PUBLIC_CHALLENGE_5_FLAG_SECRET',
  }
];
