type FormTypes =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

interface Question {
  type: FormTypes;
  title: string;
  isRequired: boolean;
  description?: string;
  possibleAnswers?: string[]; // used on MC
  userAnswer?: number | string | string[];
  children?: Question[];
  showChildrenOn?: number | string | string[] | boolean; // true to show on any answer
  metadata?: string; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CheckboxForm extends Question {
  type: 'Checkbox';
  possibleAnswers: string[];
  userAnswer?: string[];
  showChildrenOn?: string[];
}

interface EmailForm extends Question {
  type: 'Email';
  userAnswer?: string;
  showChildrenOn?: string;
}

interface NumForm extends Question {
  type: 'Num';
  userAnswer?: number;
  showChildrenOn?: number;
}

interface RadioForm extends Question {
  type: 'Radio';
  possibleAnswers: string[];
  userAnswer?: string;
  showChildrenOn?: string;
}

interface RangeForm extends Question {
  type: 'Range';
  min: number;
  max: number;
  userAnswer?: number;
  showChildrenOn: number;
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
  metadata?: string;
}
