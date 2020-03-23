import { Form, FormType, AnswerType, Answers } from './types';
import { isForm } from './typeGuards';
import { isFormComplete, getAnswers } from './utils';

export default class Base {
  form: Form;
  constructor(formString: string) {
    this.form = this.parseFromString(formString);
  }

  static validateForm = (obj: object): boolean => isForm(obj);

  private parseFromString(stringSurvey: string): Form {
    const survey = JSON.parse(stringSurvey);
    if (isForm(survey)) return survey;
    else throw Error();
  }

  public isComplete = (): boolean => isFormComplete(this.form);

  public answers = (): Answers => {
    this.form.answers = getAnswers(this.form);
    return this.form.answers;
  };

  public answerQuestion = (
    questionIdxs: number[],
    answerType: FormType,
    answer: AnswerType
  ): boolean => {
    const copy = { ...this.form };

    let { questions } = copy;

    try {
      for (const idx of questionIdxs.splice(0, questionIdxs.length - 1)) {
        const next = questions[idx].children;
        if (next) questions = next;
        else throw Error('Answer Index out of range or no children present');
      }
    } catch (error) {
      // console.log(error.message);
      return false;
    }

    try {
      const lastIdx = questionIdxs[questionIdxs.length - 1];
      const lastQuestion = questions[lastIdx];
      if (lastQuestion.type === answerType) {
        lastQuestion.answer = answer;
        isForm(copy);
        this.form = copy;
      } else throw Error();
    } catch (error) {
      // console.log(error.message);
      return false;
    }

    return true;
  };
}
