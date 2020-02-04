import { JsonForm } from '..';

test('Test JsonForm', () => {
  const testSurvey: Survey = {
    name: 'Life Insurace',
    questions: [
      {
        title: 'question 1',
        type: 'Checkbox',
        possibleAnswers: ['yes', 'no'],
        isRequired: false,
        showChildrenOn: true,
        children: [
          {
            title: 'question 1',
            type: 'Checkbox',
            possibleAnswers: ['yes', 'no'],
            isRequired: false,
          },
          {
            title: 'question 1',
            type: 'Checkbox',
            possibleAnswers: ['yes', 'no'],
            isRequired: false,
          },
        ],
      },
    ],
  };
  expect(JsonForm.validateSurvey(testSurvey)).toEqual(true);
});
