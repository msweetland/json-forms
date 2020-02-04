import _ from 'lodash';
import { isSurvey, isQuestion, isQuestionShowingChildren } from './typeGuards';

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

  public getAnswerObj = (): AnswerObj => {
    const answers: AnswerObj = {};
    const addAnswers = (quest: Question): void => {
      answers[quest.answerName] = quest.userAnswer;
      (quest.children || []).forEach(addAnswers);
    };
    this._survey.questions.forEach(addAnswers);
    return answers;
  };

  public isComplete = (): boolean => {
    const isQuestionComplete = (quest: Question): boolean => {
      if (quest.isRequired && !quest.userAnswer) {
        return false;
      }
      // is showing children check if children are required
      if (quest.children && isQuestionShowingChildren(quest)) {
        return _.every(quest.children.map(isQuestionComplete));
      }

      return true;
    };

    return _.every(this._survey.questions.map(isQuestionComplete));
  };
}
