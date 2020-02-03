export declare class SimpleSurvey {
    _survey: Survey;
    constructor(stringSurvey: string);
    private parseSurveyString;
    stringSurvey: () => string;
    survey: () => Survey;
    answerQuestion: (questionIdx: number[], answerType: FormTypes, answer: AnswerType) => void;
    isComplete: () => boolean;
}
//# sourceMappingURL=index.d.ts.map