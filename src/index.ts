import { Form, FormType, AnswerType, Answers } from './types';
import { isForm } from './typeGuards';
import { isFormComplete, getAnswers } from './utils';

export * from './types';

export default class Base {
  form: Form;
  constructor(obj: object) {
    if (isForm(obj)) this.form = obj;
    else throw Error();
  }

  static validateForm = (obj: object): boolean => isForm(obj);

  public parseFromString(stringSurvey: string): void {
    const parsed = JSON.parse(stringSurvey);
    if (isForm(parsed)) this.form = parsed;
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
