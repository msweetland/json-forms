import { isSurvey } from './typeGuards';

export class SimpleSurvey {
  _survey: Survey;
  constructor(stringSurvey: string) {
    this._survey = this.parseSurveyString(stringSurvey);
  }

  private parseSurveyString(stringSurvey: string): Survey {
    const survey = JSON.parse(stringSurvey);
    if (isSurvey(survey)) {
      return survey;
    }
    throw Error('Not a valid survey.');
  }

  public stringSurvey = (): string => JSON.stringify(this._survey);
  public survey = (): Survey => this._survey;

  public answerQuestion = (
    questionIdx: number[],
    answerType: FormTypes,
    answer: AnswerType
  ): void => {
    // for each index check if valid sub index
    // if (questionIdx >= 0 && questionIdx < this._survey.questions.length) {
    //   // if answer type matches the answer type of the question
    // } else {
    //   throw Error('Question index out of range.');
    // }
  };

  public isComplete = (): boolean => {
    //  get all possible questions
    // linked list traverse to see if question is end
    return true;
  };
}
