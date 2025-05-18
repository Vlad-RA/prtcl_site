
export interface ChallengeConfig {
  id: string; // e.g., "level1_comments"
  level: number; // 1 to 6
  answer: string | string[]; // For level 1, [username, password]. For others, single string.
  promptText?: string;
  inputPlaceholder?: string;
  flagKey: string; // Environment variable key for the flag secret
  imageUrl?: string; // For OSINT challenge
  logData?: string[]; // For log analysis challenge
}

export const challenges: ChallengeConfig[] = [
  // Level 1
  {
    id: 'level1_comments',
    level: 1,
    answer: ['admin', 'pa$$w0rd123'], 
    flagKey: 'NEXT_PUBLIC_LEVEL_1_FLAG_SECRET',
  },
  // Level 2
  {
    id: 'level2_hidden_div',
    level: 2,
    answer: 'accesskey-94831',
    promptText: 'Enter the access key found on the page:',
    inputPlaceholder: 'Access Key',
    flagKey: 'NEXT_PUBLIC_LEVEL_2_FLAG_SECRET',
  },
  // Level 3
  {
    id: 'level3_osint_image',
    level: 3,
    answer: 'Larry Page', // Example, actual image might differ
    promptText: 'Who founded the company associated with this headquarters?',
    inputPlaceholder: 'Founder\'s Name',
    flagKey: 'NEXT_PUBLIC_LEVEL_3_FLAG_SECRET',
    imageUrl: 'https://placehold.co/600x400.png', // Placeholder, to be updated by AI hint if needed
  },
  // Level 4
  {
    id: 'level4_sqli',
    level: 4,
    answer: "' OR '1'='1", // The specific SQLi string
    promptText: "Retrieve user roles. Enter a username:",
    inputPlaceholder: 'Username',
    flagKey: 'NEXT_PUBLIC_LEVEL_4_FLAG_SECRET',
  },
  // Level 5
  {
    id: 'level5_buffer_overflow',
    level: 5,
    answer: 'A'.repeat(101), // Example of a long string, exact length check might vary
    promptText: 'Enter access code:',
    inputPlaceholder: 'Access Code',
    flagKey: 'NEXT_PUBLIC_LEVEL_5_FLAG_SECRET',
  },
  // Level 6
  {
    id: 'level6_log_analysis',
    level: 6,
    answer: '127.0.0.1',
    promptText: 'Analyze the logs and identify the IP that requested the flag:',
    inputPlaceholder: 'IP Address',
    flagKey: 'NEXT_PUBLIC_LEVEL_6_FLAG_SECRET',
    logData: [
      "185.12.44.21 - /home",
      "203.0.113.45 - /login",
      "192.168.1.23 - /admin",
      "66.249.66.1 - /dashboard",
      "127.0.0.1 - /flag_request",
      "198.51.100.7 - /api/data",
      "203.0.113.45 - /logout"
    ]
  }
];
