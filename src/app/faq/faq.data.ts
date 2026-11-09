export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Textele vor fi furnizate de client; acestea sunt demonstrative. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what',
    question: 'What is this app for?',
    answer: 'It helps you set personal goals, choose the fields you study and follow your progress over time.',
  },
  {
    id: 'data',
    question: 'Where is my data stored?',
    answer: 'In this demo nothing leaves your device: the data is kept in memory and shown in the console.',
  },
  {
    id: 'import',
    question: 'Can I import my notes from another app?',
    answer: 'Yes. Export them as a CSV file and use the Import screen; invalid rows are listed so you can fix them.',
  },
];
