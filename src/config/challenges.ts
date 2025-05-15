export interface Challenge {
  id: string;
  title: string;
  description: string;
  question: string;
  placeholder?: string;
  answer: string;
  hint?: string;
  type?: 'text' | 'cipher';
}

export const challenges: Challenge[] = [
  {
    id: 'cq_01',
    title: 'Challenge 1: The Initiation',
    description: 'Welcome, Agent. Your first task is simple, yet crucial. What is the most common command to display text in a terminal?',
    question: 'Command to display text:',
    answer: 'echo',
    placeholder: 'Enter command',
    type: 'text',
  },
  {
    id: 'cq_02',
    title: 'Challenge 2: Whispers in the Code',
    description: 'We\'ve intercepted a coded message. Use the Cipher Assistant to decrypt it. The sender mentioned a "simple shift".',
    question: 'Decrypt: "Khoor, Zruog!"', // "Hello, World!" shifted by +3 (Caesar)
    answer: 'Hello, World!',
    hint: 'This looks like a Caesar cipher. The shift is small, likely related to the number of letters in a common greeting word.',
    type: 'cipher',
    placeholder: 'Enter decrypted message',
  },
  {
    id: 'cq_03',
    title: 'Challenge 3: The Logic Gate',
    description: 'A classic riddle to test your logical thinking. No ciphers here, just pure deduction.',
    question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?',
    answer: 'A map',
    placeholder: 'Your answer',
    type: 'text',
  },
  {
    id: 'cq_04',
    title: 'Challenge 4: Encrypted Intel',
    description: 'Another encrypted message. This one seems to use a keyword. The keyword is "QUEST".',
    question: 'Use the Cipher Assistant to decrypt this: "KFIGWAVM"', // Vigenere with key QUEST -> "VICTORY"
    answer: 'VICTORY',
    hint: 'This might be a Vigenere cipher. The keyword "QUEST" is vital. Input the ciphertext and hint into the assistant and ask it to decrypt.',
    type: 'cipher',
    placeholder: 'Enter decrypted message',
  }
];
