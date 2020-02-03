type FormTypes =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

type AnswerType = number | string | string[];

interface Question {
  type: FormTypes;
  title: string;
  description?: string;
  possibleAnswers?: string[]; // used on MC
  userAnswer?: AnswerType;
  isRequired: boolean;
  children?: Question[];
  showChildrenOn?: AnswerType | boolean; // true to show on any answer
}

interface Checkbox extends Question {
  type: 'Checkbox';
  possibleAnswers: string[];
  userAnswer?: string[];
}

interface Email extends Question {
  type: 'Email';
  userAnswer?: string;
}

interface Num extends Question {
  type: 'Num';
  userAnswer?: number;
}

interface Radio extends Question {
  type: 'Radio';
  possibleAnswers: string[];
  userAnswer?: string;
}

interface Range extends Question {
  type: 'Range';
  min: number;
  max: number;
  userAnswer?: number;
}

interface Text extends Question {
  type: 'Text';
  userAnswer?: string;
}

interface Date extends Question {
  type: 'Date';
  userAnswer?: string; // SQL Timestamp
}

interface Survey {
  questions: Question[];
  name: string;
}
