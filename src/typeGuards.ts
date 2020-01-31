// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArraySameType = (obj: any, type: string): boolean => {
  // not an array
  if (!Array.isArray(obj)) {
    return false;
  }

  for (const val of obj) {
    if (typeof val !== type) {
      return false;
    }
  }

  // empty array or items are the same
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCheckbox = (object: any): object is Checkbox => {
  if (object?.type !== 'Checkbox') {
    return false;
  }
  // user answers length > answers length
  // empty answers array
  // answers is not an array
  // user answer is not an array

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmail = (object: any): object is Email => {
  if (object?.type !== 'Email') {
    return false;
  }
  if (typeof object?.userAnswer !== 'string') {
    return false;
  }

  // test valid email
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(object.userAnswer as string);
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
