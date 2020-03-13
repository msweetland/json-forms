type FormType =
  | 'Checkbox'
  | 'Email'
  | 'Num'
  | 'Radio'
  | 'Range'
  | 'Text'
  | 'Time';

interface Question {
  type: FormType;
  title: string;
  description?: string;
  isRequired: boolean;
  children?: Question[];
  showChildrenOn?: string[] | boolean;
}

interface CheckboxForm extends Question {
  type: 'Checkbox';
  possibleAnswers: string[];
  answer?: string[];
  showChildrenOn?: string[] | boolean;
}

interface EmailForm extends Question {
  type: 'Email';
  showChildrenOn?: boolean;
  answer?: string;
}

interface NumForm extends Question {
  type: 'Num';
  showChildrenOn?: boolean;
  answer?: number;
}

interface RadioForm extends Question {
  type: 'Radio';
  possibleAnswers: string[];
  answer?: string;
  showChildrenOn?: string[] | boolean;
}

interface RangeForm extends Question {
  type: 'Range';
  min: number;
  max: number;
  answer?: number;
  showChildrenOn?: boolean;
}

interface TextForm extends Question {
  type: 'Text';
  answer?: string;
  showChildrenOn?: boolean;
}

interface TimeForm extends Question {
  type: 'Time';
  answer?: number;
  showChildrenOn?: boolean;
}

type Form = {
  questions: Question[];
  answers?: { [key: string]: string | string[] | number };
};
