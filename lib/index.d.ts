export declare class JsonSurvey {
    _survey: Survey;
    constructor(stringSurvey: string);
    private parseSurveyString;
    static validateSurvey: (obj: object) => boolean;
    stringSurvey: () => string;
    survey: () => Survey;
    answerQuestion: (questionIdxs: number[], answerType: FormTypes, answer: AnswerTypes) => void;
    getAnswerObj: () => AnswerObj;
    isComplete: () => boolean;
}
//# sourceMappingURL=index.d.ts.map