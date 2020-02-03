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
  metadata?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CheckboxForm extends Question {
  type: 'Checkbox';
  possibleAnswers: string[];
  userAnswer?: string[];
}

interface EmailForm extends Question {
  type: 'Email';
  userAnswer?: string;
}

interface NumForm extends Question {
  type: 'Num';
  userAnswer?: number;
}

interface RadioForm extends Question {
  type: 'Radio';
  possibleAnswers: string[];
  userAnswer?: string;
}

interface RangeForm extends Question {
  type: 'Range';
  min: number;
  max: number;
  userAnswer?: number;
}

interface TextForm extends Question {
  type: 'Text';
  userAnswer?: string;
}

interface TimeForm extends Question {
  type: 'Time';
  userAnswer?: string; // SQL Timestamp
}

interface Survey {
  questions: Question[];
  name: string;
}
