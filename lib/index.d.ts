declare class Base {
    form: Form;
    constructor(formString: string);
    static validateForm: (obj: object) => boolean;
    private parseFormString;
    isComplete: () => boolean;
    answers: () => Answers;
    answerQuestion: (questionIdxs: number[], answerType: FormType, answer: AnswerType) => boolean;
}
export default Base;
//# sourceMappingURL=index.d.ts.map