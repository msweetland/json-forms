// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isListSameType = (obj: any, type: string): boolean => {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const val of obj) {
      if (typeof val !== type) {
        return false;
      }
    }
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCheckbox = (object: any): object is Checkbox => {
  return (
    object?.type === 'Checkbox' &&
    isListSameType(object?.answers, 'string') &&
    (Array.isArray(object?.userAnswer) ||
      isListSameType(object?.userAnswer, 'string')) &&
    typeof object?.type === 'number'
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSurvey = (object: any): object is Survey => {
  if (typeof object?.version !== 'number') {
    return false;
  }
  if (typeof object?.name !== 'string') {
    return false;
  }
  if (typeof object?.startQuestion !== 'number') {
    return false;
  }

  if (!isListSameType(object?.endQuestions, 'number')) {
    return false;
  }

  if (!Array.isArray(object?.questions)) {
    return false;
  }

  for (const val of object.questions) {
    if (!isCheckbox(val)) {
      return false;
    }
  }

  return true;
};
