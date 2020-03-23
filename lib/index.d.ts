import { Form, FormType, AnswerType, Answers } from './types';
export * from './types';
export default class Base {
    form: Form;
    constructor(obj: object);
    static validateForm: (obj: object) => boolean;
    parseFromString(stringSurvey: string): void;
    isComplete: () => boolean;
    answers: () => Answers;
    answerQuestion: (questionIdxs: number[], answerType: FormType, answer: AnswerType) => boolean;
}
//# sourceMappingURL=index.d.ts.map