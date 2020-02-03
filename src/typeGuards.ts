import _ from 'lodash';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPossibleAnswers = (obj: any): obj is string[] => {
  return (
    Array.isArray(obj) && _.every(obj, _.isString) && (obj as []).length !== 0
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCheckbox = (object: any): object is CheckboxForm => {
  // check type is valid
  if (object?.type !== 'Checkbox') {
    return false;
  }

  // if user answers are not present
  if (!isPossibleAnswers(object?.possibleAnswers)) {
    return false;
  }

  // check possibleAnswers
  if (object.userAnswer) {
    if (!Array.isArray(object.userAnswer)) {
      return false;
    }

    if (object.userAnswer.length === 0) {
      return false;
    }
    // check for no duplicate answers
    const answerSet = new Set(object.userAnswer);
    if (answerSet.size !== object.userAnswer.length) {
      return false;
    }

    for (const answer of object.userAnswer) {
      if (!_.includes(object.possibleAnswers as string[], answer as string)) {
        return false;
      }
    }
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmail = (object: any): object is EmailForm => {
  if (object?.type !== 'Email') {
    return false;
  }

  if (object.userAnswer && typeof object.userAnswer === 'string') {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(object.userAnswer as string);
  }

  return typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNum = (object: any): object is NumForm => {
  if (object?.type !== 'Num') {
    return false;
  }

  return object.userAnswer
    ? typeof object.userAnswer === 'number'
    : typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRadio = (object: any): object is RadioForm => {
  if (object?.type !== 'Radio') {
    return false;
  }

  // if user answers are not present
  if (!isPossibleAnswers(object?.possibleAnswers)) {
    return false;
  }

  return object.userAnswer
    ? typeof object.userAnswer === 'string' &&
        _.includes(object.possibleAnswers, object.userAnswer)
    : typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRange = (object: any): object is RangeForm => {
  if (object?.type !== 'Range') {
    return false;
  }

  if (typeof object?.min !== 'number' || typeof object?.max !== 'number') {
    return false;
  }

  if (object.max <= object.min) {
    return false;
  }

  if (object.userAnswer && typeof object.userAnswer === 'number') {
    return object.userAnswer >= object.min && object.userAnswer <= object.max;
  }

  return typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isText = (object: any): object is TextForm => {
  if (object?.type !== 'Text') {
    return false;
  }
  return object.userAnswer
    ? typeof object.userAnswer === 'string'
    : typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTime = (object: any): object is TextForm => {
  if (object?.type !== 'Time') {
    return false;
  }

  if (object.userAnswer) {
    const formats = [
      'YYYY-MM-DD LT',
      'YYYY-MM-DD h:mm:ss A',
      'YYYY-MM-DD HH:mm:ss',
      'YYYY-MM-DD HH:mm',
    ];

    return moment(object.userAnswer, formats, true).isValid();
  } else {
    return typeof object.userAnswer === 'undefined';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isQuestion = (object: any): object is Question => {
  if (typeof object?.title !== 'string') {
    return false;
  }
  if (typeof object?.isRequired !== 'boolean') {
    return false;
  }

  if (object.description && typeof object.description !== 'string') {
    return false;
  }

  if (object.metadata && typeof object.metadata !== 'string') {
    return false;
  }

  if (
    !(
      isCheckbox(object) ||
      isEmail(object) ||
      isNum(object) ||
      isRadio(object) ||
      isRange(object) ||
      isTime(object) ||
      isText(object)
    )
  ) {
    return false;
  }

  if (object.children) {
    if (Array.isArray(object.children) && object.children.length !== 0) {
      for (const question of object.children) {
        if (!isQuestion(question)) {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSurvey = (object: any): object is Survey => {
  if (typeof object?.name !== 'string') {
    return false;
  }
  if (object.metadata && typeof object.metadata !== 'string') {
    return false;
  }

  if (Array.isArray(object.questions) && object.questions.length !== 0) {
    for (const question of object.questions) {
      if (!isQuestion(question)) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
};
