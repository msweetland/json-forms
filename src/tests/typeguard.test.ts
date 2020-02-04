// import { SimpleSurvey } from '../index';
import {
  isSurvey,
  isCheckbox,
  isEmail,
  isNum,
  isRadio,
  isText,
  isTime,
  isRange,
} from '../typeGuards';
// import { SimpleSurvey } from '..';

test('Test isSurvey and isQuestion', () => {
  const survey: Survey = {
    name: 'test survey',
    questions: [],
  };

  expect(isSurvey(survey)).toBe(false);
  const cb: CheckboxForm = {
    type: 'Checkbox',
    title: 'Test Checkbox',
    description: 'description',
    possibleAnswers: ['yes', 'no'],
    isRequired: true,
  };

  survey.questions.push(cb);
  expect(isSurvey(survey)).toBe(true);

  survey.questions[0].children = [];
  expect(isSurvey(survey)).toBe(false);

  const cb2: CheckboxForm = {
    type: 'Checkbox',
    title: 'Test Checkbox',
    description: 'description',
    possibleAnswers: ['yes', 'no'],
    isRequired: true,
  };

  survey.questions[0].children = [cb2];
  expect(isSurvey(survey)).toBe(false);

  cb.showChildrenOn = ['maybe'];
  survey.questions[0] = cb;
  expect(isSurvey(survey)).toBe(false);

  cb.showChildrenOn = ['yes'];
  survey.questions[0] = cb;
  expect(isSurvey(survey)).toBe(false);
});

test('Test isCheckbox typeGuard.', () => {
  const cb: CheckboxForm = {
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
  const em: EmailForm = {
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
  const num: NumForm = {
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
  const radio: RadioForm = {
    type: 'Radio',
    title: 'Radio test',
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

test('Test isRange typeGuard.', () => {
  const range = {
    type: 'Range',
    title: 'Range test',
    description: 'description',
    isRequired: true,
  } as RangeForm;
  expect(isRange(range)).toBe(false);
  range.min = 0;
  expect(isRange(range)).toBe(false);
  range.max = 0;
  expect(isRange(range)).toBe(false);
  range.max = 1;
  expect(isRange(range)).toBe(true);

  range.userAnswer = 1;
  expect(isRange(range)).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  range.userAnswer = 'negative' as any;
  expect(isRange(range)).toBe(false);
  range.userAnswer = 2;
  expect(isRange(range)).toBe(false);
});

test('Test isText typeGuard.', () => {
  const text: TextForm = {
    type: 'Text',
    title: 'Text test',
    description: 'description',
    isRequired: true,
  };
  expect(isText(text)).toBe(true);
  text.userAnswer = 'yes';
  expect(isText(text)).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text.userAnswer = 1 as any;
  expect(isText(text)).toBe(false);
});

test('Test isTime typeGuard.', () => {
  const time: TimeForm = {
    type: 'Time',
    title: 'Time test',
    description: 'description',
    isRequired: true,
  };
  expect(isTime(time)).toBe(true);
  time.userAnswer = '2018-06-21 12:55:59';
  expect(isTime(time)).toBe(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  time.userAnswer = 1 as any;
  expect(isTime(time)).toBe(false);
  time.userAnswer = '2018-06-21 12:55:61';
  expect(isTime(time)).toBe(false);
});
