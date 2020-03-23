import { Form, FormType, AnswerType, Answers } from './types';
export default class Base {
    form: Form;
    constructor(formString: string);
    static validateForm: (obj: object) => boolean;
    private parseFromString;
    isComplete: () => boolean;
    answers: () => Answers;
    answerQuestion: (questionIdxs: number[], answerType: FormType, answer: AnswerType) => boolean;
}
//# sourceMappingURL=index.d.ts.map