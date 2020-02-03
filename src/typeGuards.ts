import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPossibleAnswers = (obj: any): obj is string[] => {
  return (
    Array.isArray(obj) && _.every(obj, _.isString) && (obj as []).length !== 0
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCheckbox = (object: any): object is Checkbox => {
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
export const isEmail = (object: any): object is Email => {
  if (object?.type !== 'Email') {
    return false;
  }

  if (object.userAnswer && typeof object.userAnswer === 'string') {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(emailRegex.test(object.userAnswer as string));
    return emailRegex.test(object.userAnswer as string);
  }

  return typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNum = (object: any): object is Num => {
  if (object?.type !== 'Num') {
    return false;
  }

  return object.userAnswer
    ? typeof object.userAnswer === 'number'
    : typeof object.userAnswer === 'undefined';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRadio = (object: any): object is Radio => {
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
export const isSurvey = (object: any): object is Survey => {
  if (typeof object?.name !== 'string') {
    return false;
  }

  if (!object?.questions) {
    return false;
  } else if (Object.keys(object.questions).length === 0) {
    return false;
  } else {
    for (const val of object.questions) {
      if (!isCheckbox(val) || !isEmail(val)) {
        return false;
      }
    }
  }
  return true;
};
