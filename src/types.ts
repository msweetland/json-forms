type FormType =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

interface QuestionBase {
  type: FormType;
  title: string;
  description?: string;
  isRequired: boolean;
  children?: Question[];
  showChildrenOn?: string[] | boolean;
}

interface CheckboxForm extends QuestionBase {
  type: 'Checkbox';
  possibleAnswers: string[];
  answer?: string[];
  showChildrenOn?: string[] | boolean;
}

interface EmailForm extends QuestionBase {
  type: 'Email';
  showChildrenOn?: boolean;
  answer?: string;
}

interface NumForm extends QuestionBase {
  type: 'Num';
  showChildrenOn?: boolean;
  answer?: number;
}

interface RadioForm extends QuestionBase {
  type: 'Radio';
  possibleAnswers: string[];
  answer?: string;
  showChildrenOn?: string[] | boolean;
}

interface RangeForm extends QuestionBase {
  type: 'Range';
  min: number;
  max: number;
  answer?: number;
  showChildrenOn?: boolean;
}

interface TextForm extends QuestionBase {
  type: 'Text';
  answer?: string;
  showChildrenOn?: boolean;
}

interface TimeForm extends QuestionBase {
  type: 'Time';
  answer?: number;
  showChildrenOn?: boolean;
}

type Question =
  | CheckboxForm
  | EmailForm
  | NumForm
  | RadioForm
  | RangeForm
  | TextForm
  | TimeForm;

type AnswerType = string | string[] | number;
type Answers = { [key: string]: AnswerType };

type Form = {
  questions: Question[];
  answers?: Answers;
};
