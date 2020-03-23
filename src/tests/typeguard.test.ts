import {
  isFormType,
  isQuestion,
  isCheckboxForm,
  isEmailForm,
  isNumForm,
  isRadioForm,
  isRangeForm,
  isTextForm,
  isTimeForm,
  hasUniqueTitles,
  isForm,
} from '../typeGuards';
import {
  Question,
  CheckboxForm,
  EmailForm,
  NumForm,
  RadioForm,
  RangeForm,
  TextForm,
  TimeForm,
  Form,
} from '../types';

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
    possibleAnswers: ['a', 'b'],
  };
  expect(isQuestion(working)).toEqual(true);

  // Unkown key
  expect(isQuestion({ ...working, unkown: true })).toEqual(true);

  working.children = [{ ...working }, { ...working }];

  // no showChildrenOn
  expect(() => isQuestion(working)).toThrow(Error);

  working.showChildrenOn = true;
  expect(isQuestion(working)).toEqual(true);

  expect(() => isQuestion({ ...working, children: [{}, {}] })).toThrow(Error);

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

test('Test isEmailForm', () => {
  const working: EmailForm = {
    type: 'Email',
    title: 'Title',
    isRequired: true,
  };

  expect(isEmailForm(working)).toEqual(true);
  expect(() => isEmailForm({ ...working, unkown: true })).toThrow(Error);

  working.answer = 'not an email';
  expect(() => isEmailForm(working)).toThrow(Error);

  working.answer = 'msweetland@msweetland.com';
  expect(isEmailForm(working)).toEqual(true);
});

test('Test isNumForm', () => {
  const working: NumForm = {
    type: 'Num',
    title: 'Title',
    isRequired: true,
  };
  expect(isNumForm(working)).toEqual(true);
  expect(() => isNumForm({ ...working, unkown: true })).toThrow(Error);
  expect(() => isNumForm({ ...working, answer: 'string' })).toThrow(Error);
  expect(isNumForm({ ...working, answer: '420' })).toEqual(true);
  expect(isNumForm({ ...working, answer: '-420' })).toEqual(true);
  expect(isNumForm({ ...working, answer: 420 })).toEqual(true);
  expect(isNumForm({ ...working, answer: -420 })).toEqual(true);
});

test('Test isRadioForm', () => {
  const working: RadioForm = {
    type: 'Radio',
    title: 'Title',
    isRequired: true,
    possibleAnswers: ['eat'],
  };

  expect(isRadioForm(working)).toEqual(true);
  expect(() => isRadioForm({ ...working, unkown: true })).toThrow(Error);

  working.children = [{ ...working }];

  // no showChildrenOn
  expect(() => isRadioForm(working)).toThrow(Error);

  working.showChildrenOn = true;
  expect(isRadioForm(working)).toEqual(true);

  working.showChildrenOn = false;
  expect(() => isRadioForm(working)).toThrow(Error);

  working.showChildrenOn = [];
  expect(() => isRadioForm(working)).toThrow(Error);

  working.showChildrenOn = ['qwerty'];
  expect(() => isRadioForm(working)).toThrow(Error);

  working.showChildrenOn = ['eat'];
  expect(isRadioForm(working)).toEqual(true);

  working.showChildrenOn = ['qwerty', 'eat'];
  expect(() => isRadioForm(working)).toThrow(Error);

  working.showChildrenOn = undefined;
  working.children = undefined;

  working.possibleAnswers = ['eat'];
  working.answer = 'eat';
  expect(isRadioForm(working)).toEqual(true);

  working.possibleAnswers = ['eat', 'eat'];
  working.answer = 'eat';
  expect(() => isRadioForm(working)).toThrow(Error);

  expect(() => isRadioForm({ ...working, answer: ['eat'] })).toThrow(Error);

  working.possibleAnswers = ['1', '2', '3'];
  working.answer = undefined;
  expect(isRadioForm(working)).toEqual(true);
});

test('Test isRangeForm', () => {
  const working: RangeForm = {
    type: 'Range',
    title: 'Title',
    isRequired: true,
    min: 0,
    max: 10,
  };
  expect(isRangeForm(working)).toEqual(true);
  expect(() => isRangeForm({ ...working, unkown: true })).toThrow(Error);
  expect(() => isRangeForm({ ...working, answer: 'string' })).toThrow(Error);
  expect(() => isRangeForm({ ...working, answer: '420' })).toThrow(Error);
  expect(isRangeForm({ ...working, answer: '0' })).toEqual(true);
  expect(isRangeForm({ ...working, answer: 10 })).toEqual(true);
  expect(isRangeForm({ ...working, answer: 5 })).toEqual(true);
  expect(() => isRangeForm({ ...working, min: 10, max: 0 })).toThrow(Error);
});

test('Test isTextForm', () => {
  const working: TextForm = {
    type: 'Text',
    title: 'Title',
    isRequired: true,
  };

  expect(isTextForm(working)).toEqual(true);
  expect(() => isTextForm({ ...working, unkown: true })).toThrow(Error);

  working.answer = 'not an email';
  expect(isTextForm(working)).toEqual(true);

  working.answer = 'msweetland@msweetland.com';
  expect(isTextForm(working)).toEqual(true);
});

test('Test isTimeForm', () => {
  const working: TimeForm = {
    type: 'Time',
    title: 'Title',
    isRequired: true,
  };
  expect(isTimeForm(working)).toEqual(true);
  expect(() => isTimeForm({ ...working, unkown: true })).toThrow(Error);
  expect(() => isTimeForm({ ...working, answer: 'string' })).toThrow(Error);

  const now = new Date();
  expect(isTimeForm({ ...working, answer: now.getTime() })).toEqual(true);
  expect(isTimeForm({ ...working, answer: now })).toEqual(true);
});

test('Test hasUniqueTitles', () => {
  let validFormDuplicateTiles: Form = {
    questions: [
      {
        title: 'A',
        type: 'Email',
        isRequired: true,
        children: [
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
        ],
      },
    ],
  };

  expect(() => hasUniqueTitles(validFormDuplicateTiles.questions)).toThrow(
    Error
  );

  validFormDuplicateTiles = {
    questions: [
      {
        title: 'A',
        type: 'Email',
        isRequired: true,
        children: [
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
          {
            title: 'C',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
        ],
      },
    ],
  };

  expect(hasUniqueTitles(validFormDuplicateTiles.questions)).toEqual(
    new Set(['A', 'B', 'C'])
  );
});

test('Test isForm', () => {
  let form: Form = {
    questions: [
      {
        title: 'A',
        type: 'Email',
        isRequired: true,
        showChildrenOn: true,
        children: [
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
        ],
      },
    ],
  };

  expect(() => isForm(form)).toThrow(Error);

  form = {
    questions: [
      {
        title: 'A',
        type: 'Email',
        isRequired: true,
        showChildrenOn: true,
        children: [
          {
            title: 'B',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
          {
            title: 'C',
            type: 'Range',
            min: 0,
            max: 1,
            isRequired: false,
          },
        ],
      },
    ],
  };

  expect(isForm(form)).toEqual(true);
});
