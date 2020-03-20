export const areChildrenVisible = (quest: Question): boolean => {
  if (!(quest.children && quest.showChildrenOn) || !quest.answer) {
    return false;
  }

  if (typeof quest.showChildrenOn === 'boolean') {
    return quest.showChildrenOn;
  }

  if (quest.type === 'Checkbox') {
    const possibles = new Set(quest.showChildrenOn as string[]);
    for (const answer of quest.answer as string[]) {
      if (possibles.has(answer)) {
        return true;
      }
    }
    return false;
  }

  if (quest.type === 'Radio') {
    return quest.possibleAnswers.indexOf(quest.answer as string) !== -1;
  }

  return true;
};

export const getAnswers = (form: Form): Answers => {
  const answers: Answers = {};

  const helper = (quest: Question): void => {
    if (quest.answer) {
      answers[quest.title] = quest.answer;
    }

    if (areChildrenVisible(quest)) {
      (quest.children || []).forEach(helper);
    }
  };

  form.questions.forEach(helper);
  return answers;
};

export const isFormComplete = (form: Form): boolean => {
  const helper = (quest: Question): boolean => {
    if (quest.isRequired && !quest.answer) {
      return false;
    }

    if (quest.children && areChildrenVisible(quest)) {
      return quest.children.map(helper).every((v) => v);
    } else {
      return true;
    }
  };

  return form.questions.map(helper).every((v) => v);
};
