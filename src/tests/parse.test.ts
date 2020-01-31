// import { SimpleSurvey } from '../index';
import { isCheckbox, isEmail } from '../typeGuards';

// test('Validate isSurvey', () => {
//   const survey: Survey = {
//     questions: {},
//     version: 1,
//     name: 'Insurance Application',
//     startQuestion: 0,
//     endQuestions: [0],
//   };

//   expect(() => new SimpleSurvey(JSON.stringify(survey))).toThrow(Error);

//   delete survey.name;
//   expect(() => new SimpleSurvey(JSON.stringify(survey))).toThrow(Error);

//   delete survey.version;
//   expect(() => new SimpleSurvey(JSON.stringify(survey))).toThrow(Error);

//   delete survey.endQuestions;
//   expect(() => new SimpleSurvey(JSON.stringify(survey))).toThrow(Error);
// });

test('Validate isCheckbox', () => {
  const cb: Checkbox = {
    type: 'Checkbox',
    answers: ['yes', 'no'],
    userAnswer: [],
    nextQuestion: 0,
    showIf: 1,
  };
  expect(isCheckbox(cb)).toBe(true);
  cb.userAnswer = ['yes', 'no'];
  delete cb.showIf;
  expect(isCheckbox(cb)).toBe(true);
  cb.userAnswer.push('yes');
  expect(isCheckbox(cb)).toBe(false);
  cb.userAnswer = ['yes', 'no'];
  cb.answers = [];
  expect(isCheckbox(cb)).toBe(false);
  delete cb.nextQuestion;
  expect(isCheckbox(cb)).toBe(false);
});

test('Validate isEmail', () => {
  const em: Email = {
    type: 'Email',
    userAnswer: '',
    nextQuestion: 0,
    showIf: 1,
  };
  expect(isEmail(em)).toBe(false);
  em.userAnswer = 'mjs@mjs.com';
  expect(isEmail(em)).toBe(true);
  delete em.showIf;
  expect(isEmail(em)).toBe(true);
  delete em.nextQuestion;
  expect(isEmail(em)).toBe(false);
});
