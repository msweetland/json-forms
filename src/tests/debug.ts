import { SimpleSurvey } from '../index';

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
console.log(survey);
