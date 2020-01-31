type FormTypes =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

interface Checkbox {
  type: 'Checkbox';
  answers: string[];
  userAnswer: string[];
  nextQuestion: number;
  showIf?: number;
}

interface Email {
  type: 'Email';
  userAnswer: string;
  nextQuestion: number;
  showIf?: number;
}

interface Num {
  type: 'Num';
  userAnswer: number;
  nextQuestion: number;
  showIf?: number;
}

interface Radio {
  type: 'Radio';
  answers: string[];
  userAnswer: string;
  nextQuestion: number;
  showIf?: number;
}

interface Range {
  type: 'Range';
  answersFrom: number;
  answersTo: number;
  userAnswer: number;
  nextQuestion: number;
  showIf?: number;
}

interface Text {
  type: 'Text';
  userAnswer: string;
  nextQuestion: number;
  showIf?: number;
}

interface Date {
  type: 'Date';
  userAnswer: string; // SQL Timestamp
  nextQuestion: number;
  showIf?: number;
}

interface Survey {
  questions: {
    [key: number]: Checkbox | Email | Num | Radio | Range | Comment | Date;
  };
  version: number;
  name: string;
  startQuestion: number;
  endQuestions: number[];
}
