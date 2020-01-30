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
    // check if all end can be reached
    throw Error('Not a valid survey object');
  }

  public stringSurvey = (): string => JSON.stringify(this._survey);
}
