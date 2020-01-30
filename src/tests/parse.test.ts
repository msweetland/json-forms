import { SimpleSurvey } from '../index';

test('Parsing test isSurvey and isCheckbox valid checkbox', () => {
  const validCheckboxSurvey: Survey = {
    questions: {
      0: {
        type: 'Checkbox',
        answers: ['yes', 'no'],
        userAnswer: [],
        nextQuestion: 0,
        showIf: 1,
      },
    },
    version: 1,
    name: 'Insurance Application',
    startQuestion: 0,
    endQuestions: [0],
  };

  const stringSurvey = JSON.stringify(validCheckboxSurvey);
  const survey = new SimpleSurvey(stringSurvey);
  expect(survey.stringSurvey()).toEqual(stringSurvey);
});
