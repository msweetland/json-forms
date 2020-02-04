import { JsonSurvey } from '..';

test('Test static validateSurvey in JsonForm', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testSurvey: any = {
    name: 'Life Insurace',
    questions: [
      {
        title: 'question 1',
        answerName: 'likesX',
        type: 'Checkbox',
        possibleAnswers: ['yes', 'no'],
        isRequired: false,
        showChildrenOn: true,
        children: [
          {
            title: 'question 2',
            type: 'Checkbox',
            answerName: 'likesY',
            possibleAnswers: ['yes', 'no'],
            isRequired: false,
          },
          {
            title: 'question 3',
            type: 'Checkbox',
            answerName: 'likesZ',
            possibleAnswers: ['yes', 'no'],
            isRequired: false,
          },
        ],
      },
    ],
  };
  expect(JsonSurvey.validateSurvey(testSurvey)).toEqual(true);
  testSurvey.questions.push({});
  expect(JsonSurvey.validateSurvey(testSurvey)).toEqual(false);
});

test('Test answerquestion in JsonForm', () => {
  const surveyStr = JSON.stringify({
    name: 'Life Insurace',
    questions: [
      {
        title: 'Do you like',
        type: 'Checkbox',
        answerName: 'likesX',
        possibleAnswers: ['yes', 'no'],
        isRequired: false,
        showChildrenOn: true,
        children: [
          {
            title: 'User Email 1',
            answerName: 'email1',
            type: 'Email',
            isRequired: false,
            showChildrenOn: true,
            children: [
              {
                title: 'User Email 2',
                answerName: 'email2',
                type: 'Email',
                isRequired: false,
              },
            ],
          },
          {
            title: 'User Email 3',
            answerName: 'email3',
            type: 'Email',
            isRequired: false,
          },
        ],
      },
    ],
  });

  expect(() => new JsonSurvey(surveyStr)).not.toThrow(Error);

  const survey = new JsonSurvey(surveyStr);
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

  expect(survey.stringSurvey()).toEqual(
    JSON.stringify({
      name: 'Life Insurace',
      questions: [
        {
          title: 'Do you like',
          type: 'Checkbox',
          answerName: 'likesX',
          possibleAnswers: ['yes', 'no'],
          isRequired: false,
          showChildrenOn: true,
          children: [
            {
              title: 'User Email 1',
              answerName: 'email1',
              type: 'Email',
              isRequired: false,
              showChildrenOn: true,
              children: [
                {
                  title: 'User Email 2',
                  answerName: 'email2',
                  type: 'Email',
                  isRequired: false,
                  userAnswer: 'test@test.com',
                },
              ],
              userAnswer: 'test@test.com',
            },
            {
              title: 'User Email 3',
              answerName: 'email3',
              type: 'Email',
              isRequired: false,
              userAnswer: 'test@test.com',
            },
          ],
          userAnswer: ['yes', 'no'],
        },
      ],
    })
  );
});
