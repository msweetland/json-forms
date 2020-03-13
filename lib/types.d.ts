declare type FormTypes = 'Checkbox' | 'Email' | 'Num' | 'Radio' | 'Range' | 'Text' | 'Time';
declare type AnswerTypes = number | string | string[];
declare type AnswerObj = {
    [key: string]: AnswerTypes | undefined;
};
interface Question {
    type: FormTypes;
    title: string;
    answerName: string;
    isRequired: boolean;
    description?: string;
    possibleAnswers?: string[];
    userAnswer?: AnswerTypes;
    children?: Question[];
    showChildrenOn?: string[] | boolean;
    metadata?: string;
}
interface CheckboxForm extends Question {
    type: 'Checkbox';
    possibleAnswers: string[];
    userAnswer?: string[];
    showChildrenOn?: string[] | boolean;
}
interface EmailForm extends Question {
    type: 'Email';
    userAnswer?: string;
    showChildrenOn?: boolean;
}
interface NumForm extends Question {
    type: 'Num';
    userAnswer?: number;
    showChildrenOn?: boolean;
}
interface RadioForm extends Question {
    type: 'Radio';
    possibleAnswers: string[];
    userAnswer?: string;
    showChildrenOn?: string[] | boolean;
}
interface RangeForm extends Question {
    type: 'Range';
    min: number;
    max: number;
    userAnswer?: number;
    showChildrenOn?: boolean;
}
interface TextForm extends Question {
    type: 'Text';
    userAnswer?: string;
    showChildrenOn?: boolean;
}
interface TimeForm extends Question {
    type: 'Time';
    userAnswer?: string;
    showChildrenOn?: boolean;
}
interface Survey {
    questions: Question[];
    name: string;
    metadata?: string;
}
//# sourceMappingURL=types.d.ts.map