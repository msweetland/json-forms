import { JsonForm } from '..';

test('Test static validateSurvey in JsonForm', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testSurvey: any = {
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
  testSurvey.questions.push({});
  expect(JsonForm.validateSurvey(testSurvey)).toEqual(false);
});

test('Test answerquestion in JsonForm', () => {
  const surveyStr = JSON.stringify({
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
            type: 'Email',
            isRequired: false,
            showChildrenOn: true,
            children: [
              {
                title: 'question 1',
                type: 'Email',
                isRequired: false,
              },
            ],
          },
          {
            title: 'question 1',
            type: 'Email',
            isRequired: false,
          },
        ],
      },
    ],
  });

  expect(() => new JsonForm(surveyStr)).not.toThrow(Error);

  const survey = new JsonForm(surveyStr);
  expect(() => survey.answerQuestion([1], 'Email', 'test')).toThrow(Error);
  expect(() => survey.answerQuestion([0], 'Checkbox', 'test')).toThrow(Error);
  expect(() => survey.answerQuestion([0], 'Checkbox', ['yes'])).not.toThrow(
    Error
  );
  expect(() =>
    survey.answerQuestion([0], 'Checkbox', ['yes', 'no'])
  ).not.toThrow(Error);
  expect(() => survey.answerQuestion([0], 'Checkbox', ['yes', 'yes'])).toThrow(
    Error
  );
  expect(() => survey.answerQuestion([0, 0], 'Email', ['yes', 'yes'])).toThrow(
    Error
  );
  expect(() => survey.answerQuestion([0, 0], 'Email', 'bad email')).toThrow(
    Error
  );
  expect(() =>
    survey.answerQuestion([0, 0], 'Email', 'test@test.com')
  ).not.toThrow(Error);
  expect(() =>
    survey.answerQuestion([0, 1], 'Email', 'test@test.com')
  ).not.toThrow(Error);
  expect(() =>
    survey.answerQuestion([0, 0, 0], 'Email', 'test@test.com')
  ).not.toThrow(Error);
});
