import { isSurvey, isQuestion } from './typeGuards';

export class JsonSurvey {
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

  static validateSurvey = (obj: object): boolean => isSurvey(obj);

  public stringSurvey = (): string => JSON.stringify(this._survey);
  public survey = (): Survey => this._survey;

  public answerQuestion = (
    questionIdxs: number[],
    answerType: FormTypes,
    answer: AnswerTypes
  ): void => {
    let questions: Question[] = this._survey.questions;
    for (const idx of questionIdxs.splice(0, questionIdxs.length - 1)) {
      if (questions[idx].children) {
        questions = questions[idx].children as Question[];
      } else {
        throw Error('Answer Index out of range or no children present');
      }
    }

    const lastIdx = questionIdxs[questionIdxs.length - 1];
    if (questions[lastIdx]) {
      const clone = JSON.parse(JSON.stringify(questions[lastIdx])) as Question;
      if (clone.type !== answerType) {
        throw Error('Answer types do not match.');
      }

      clone.userAnswer = answer;
      if (!isQuestion(clone)) {
        throw Error('Invalid answer.');
      }

      questions[lastIdx] = clone;
    } else {
      throw Error('Answer Index out of range or no children present.');
    }
  };

  public answers = (): { [key: string]: AnswerTypes } => ({});

  public isComplete = (): boolean => {
    // const isCompletehelper = (quest: Question): boolean => {
    //   const {userAnswer, children, showChildrenOn, isRequired} = quest;
    //   // if question not answered and not required and doesn't have children return true
    //   if (!userAnswer && !isRequired) {
    //     return true;
    //   }

    //   // if answered and answer == showChildren and children check children

    //   else if (children && )

    //   else if (children) {
    //     return
    //   }

    //   if (userAnswer ) {

    //   }

    //   // check children if question is correct answer and has children
    //   // if
    //   if ( quest.isRequired)
    // }

    // for (const question of this._survey.questions) {
    //   question.
    // }

    //  get all possible questions
    // linked list traverse to see if question is end
    return true;
  };
}
