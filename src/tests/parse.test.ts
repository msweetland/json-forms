// import { SimpleSurvey } from '../index';
import { isCheckbox, isEmail, isNum, isRadio } from '../typeGuards';

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

test('Test isCheckbox typeGuard.', () => {
  const cb: Checkbox = {
    type: 'Checkbox',
    title: 'Test Checkbox',
    description: 'description',
    possibleAnswers: ['yes', 'no'],
    isRequired: true,
  };
  expect(isCheckbox(cb)).toBe(true);
  cb.userAnswer = ['yes', 'yes'];
  expect(isCheckbox(cb)).toBe(false);
  cb.userAnswer = ['yes', 'no'];
  expect(isCheckbox(cb)).toBe(true);
  cb.userAnswer = [];
  expect(isCheckbox(cb)).toBe(false);
  cb.possibleAnswers = [];
  expect(isCheckbox(cb)).toBe(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const badAns = [1, 2, 3] as any;
  cb.possibleAnswers = badAns;
  expect(isCheckbox(cb)).toBe(false);
});

test('Test isEmail typeGuard.', () => {
  const em: Email = {
    type: 'Email',
    title: 'Email test',
    description: 'description',
    isRequired: true,
  };
  expect(isEmail(em)).toBe(true);
  em.userAnswer = 'mjs@mjs.com';
  expect(isEmail(em)).toBe(true);
  em.userAnswer = 'bad email';
  expect(isEmail(em)).toBe(false);
});

test('Test isNum typeGuard.', () => {
  const num: Num = {
    type: 'Num',
    title: 'Num test',
    description: 'description',
    isRequired: true,
  };
  expect(isNum(num)).toBe(true);
  num.userAnswer = 1;
  expect(isNum(num)).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  num.userAnswer = 'bad number' as any;
  expect(isNum(num)).toBe(false);
});

test('Test isRadio typeGuard.', () => {
  const radio: Radio = {
    type: 'Radio',
    title: 'Num test',
    description: 'description',
    possibleAnswers: ['yes', 'no'],
    isRequired: true,
  };
  expect(isRadio(radio)).toBe(true);
  radio.userAnswer = 'yes';
  expect(isRadio(radio)).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  radio.userAnswer = 1 as any;
  expect(isRadio(radio)).toBe(false);
  radio.userAnswer = 'negative';
  expect(isRadio(radio)).toBe(false);
});
