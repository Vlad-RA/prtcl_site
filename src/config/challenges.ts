
export interface ChallengeConfig {
  id: string; // e.g., "level1_comments"
  level: number; // 1 to 6
  answer: string | string[]; // For level 1, [username, password]. For others, single string.
  flagValue: string; // The actual flag string, e.g., "FLAG{example_flag}"
  promptText?: string;
  inputPlaceholder?: string;
  imageUrl?: string; // For OSINT challenge
  logData?: string[]; // For log analysis challenge
}

export const challenges: ChallengeConfig[] = [
  // Level 1
  {
    id: 'level1_comments',
    level: 1,
    answer: ['admin', 'pa$$w0rd123'],
    flagValue: 'FLAG{html_comments_pwn}',
  },
  // Level 2
  {
    id: 'level2_hidden_div',
    level: 2,
    answer: 'accesskey-94831',
    promptText: 'A hidden element contains an access key. Find it and enter it below:',
    inputPlaceholder: 'Access Key',
    flagValue: 'FLAG{dom_hidden_div}',
  },
  // Level 3
  {
    id: 'level3_osint_image',
    level: 3,
    answer: 'Larry Page',
    promptText: 'Who founded the company associated with the headquarters depicted in this image?',
    inputPlaceholder: "Founder's Name",
    flagValue: 'FLAG{osint_image_trace}',
    imageUrl: 'https://placehold.co/600x400.png', 
  },
  // Level 4
  {
    id: 'level4_sqli',
    level: 4,
    answer: "' OR '1'='1", 
    promptText: "A user role lookup system is available. Try to bypass its restrictions. Enter a username:",
    inputPlaceholder: 'Username',
    flagValue: 'FLAG{sql_i_like_it}',
  },
  // Level 5
  {
    id: 'level5_buffer_overflow',
    level: 5,
    answer: 'A'.repeat(101), // This answer is primarily for the config, the logic checks length > 100
    promptText: 'This input field seems to have a length limit. What happens if you exceed it? Enter access code:',
    inputPlaceholder: 'Access Code (try a very long one)',
    flagValue: 'FLAG{overflow_injected_fun}',
  },
  // Level 6
  {
    id: 'level6_log_analysis',
    level: 6,
    answer: '127.0.0.1',
    promptText: 'Analyze the server logs below and identify the IP address that made a suspicious request to /flag_request:',
    inputPlaceholder: 'IP Address',
    flagValue: 'FLAG{logs_tell_all}',
    logData: [
      "185.12.44.21 - /home - [2023-10-26 10:00:00]",
      "203.0.113.45 - /login - [2023-10-26 10:01:30]",
      "192.168.1.23 - /admin - [2023-10-26 10:02:15] - Failed Login Attempt",
      "66.249.66.1 - /dashboard - [2023-10-26 10:03:00]",
      "203.0.113.45 - /products - [2023-10-26 10:04:05]",
      "127.0.0.1 - /flag_request - [2023-10-26 10:05:00]",
      "198.51.100.7 - /api/data - [2023-10-26 10:05:50]",
      "203.0.113.45 - /logout - [2023-10-26 10:06:20]",
      "185.12.44.21 - /home - [2023-10-26 10:07:00]",
      "192.168.1.101 - /settings - [2023-10-26 10:08:15]"
    ]
  }
];
