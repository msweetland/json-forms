export type FormType =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

export interface QuestionBase {
  type: FormType;
  title: string;
  description?: string;
  isRequired: boolean;
  children?: Question[];
  showChildrenOn?: string[] | boolean;
}

export interface CheckboxForm extends QuestionBase {
  type: 'Checkbox';
  possibleAnswers: string[];
  answer?: string[];
  showChildrenOn?: string[] | boolean;
}

export interface EmailForm extends QuestionBase {
  type: 'Email';
  showChildrenOn?: boolean;
  answer?: string;
}

export interface NumForm extends QuestionBase {
  type: 'Num';
  showChildrenOn?: boolean;
  answer?: number;
}

export interface RadioForm extends QuestionBase {
  type: 'Radio';
  possibleAnswers: string[];
  answer?: string;
  showChildrenOn?: string[] | boolean;
}

export interface RangeForm extends QuestionBase {
  type: 'Range';
  min: number;
  max: number;
  answer?: number;
  showChildrenOn?: boolean;
}

export interface TextForm extends QuestionBase {
  type: 'Text';
  answer?: string;
  showChildrenOn?: boolean;
}

export interface TimeForm extends QuestionBase {
  type: 'Time';
  answer?: number;
  showChildrenOn?: boolean;
}

export type Question =
  | CheckboxForm
  | EmailForm
  | NumForm
  | RadioForm
  | RangeForm
  | TextForm
  | TimeForm;

export type AnswerType = string | string[] | number;
export type Answers = { [key: string]: AnswerType };

export type Form = {
  questions: Question[];
  answers?: Answers;
};
