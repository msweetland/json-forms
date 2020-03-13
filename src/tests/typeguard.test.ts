// // import { SimpleSurvey } from '../index';
// import {
//   isSurvey,
//   isCheckbox,
//   isEmail,
//   isNum,
//   isRadio,
//   isText,
//   isTime,
//   isRange,
//   areAnswerNamesUnique,
// } from '../typeGuards';
// // import { SimpleSurvey } from '..';

import { isFormType, isQuestion, isCheckboxForm } from '../typeGuards';

test('Test isFormType', () => {
  expect(() => isFormType('bad')).toThrow(Error);
  expect(() => isFormType('checkbox')).toThrow(Error);
  expect(isFormType('Checkbox')).toEqual(true);
  expect(isFormType('Email')).toEqual(true);
  expect(isFormType('Num')).toEqual(true);
  expect(isFormType('Radio')).toEqual(true);
  expect(isFormType('Range')).toEqual(true);
  expect(isFormType('Text')).toEqual(true);
  expect(isFormType('Time')).toEqual(true);
});

test('Test isQuestion', () => {
  expect(() => isQuestion({})).toThrow(Error);

  const badType = {
    type: 'checkbox',
  };
  expect(() => isQuestion(badType)).toThrow(Error);

  const noIsRequired = {
    type: 'Checkbox',
    title: 'Title',
  };
  expect(() => isQuestion(noIsRequired)).toThrow(Error);

  const working: Question = {
    type: 'Checkbox',
    title: 'Title',
    isRequired: true,
  };
  expect(isQuestion(working)).toEqual(true);

  // Unkown key
  expect(isQuestion({ ...working, unkown: true })).toEqual(true);

  working.children = [{ ...working }, { ...working }];

  // no showChildrenOn
  expect(() => isQuestion(working)).toThrow(Error);

  working.showChildrenOn = true;
  expect(isQuestion(working)).toEqual(true);

  working.showChildrenOn = false;
  expect(() => isQuestion(working)).toThrow(Error);

  working.showChildrenOn = [];
  expect(() => isQuestion(working)).toThrow(Error);

  working.showChildrenOn = ['qwerty'];
  expect(isQuestion(working)).toEqual(true);
});

test('Test isCheckboxForm', () => {
  expect(() => isCheckboxForm({})).toThrow(Error);

  const working: CheckboxForm = {
    type: 'Checkbox',
    title: 'Title',
    isRequired: true,
    possibleAnswers: ['eat'],
  };

  expect(isCheckboxForm(working)).toEqual(true);
  expect(() => isCheckboxForm({ ...working, unkown: true })).toThrow(Error);

  working.children = [{ ...working }];

  // no showChildrenOn
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.showChildrenOn = true;
  expect(isCheckboxForm(working)).toEqual(true);

  working.showChildrenOn = false;
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.showChildrenOn = [];
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.showChildrenOn = ['qwerty'];
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.showChildrenOn = ['eat'];
  expect(isCheckboxForm(working)).toEqual(true);

  working.showChildrenOn = ['qwerty', 'eat'];
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.showChildrenOn = undefined;
  working.children = undefined;

  working.possibleAnswers = ['eat'];
  working.answer = ['eat'];
  expect(isCheckboxForm(working)).toEqual(true);

  working.possibleAnswers = ['eat'];
  working.answer = ['eat', 'eat'];
  expect(() => isCheckboxForm(working)).toThrow(Error);

  working.possibleAnswers = ['1', '2', '3'];
  working.answer = ['3', '2'];
  expect(isCheckboxForm(working)).toEqual(true);
});
