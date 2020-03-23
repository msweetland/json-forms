import { getAnswers, isFormComplete } from '../utils';

test('Test getAnswers', () => {
  let form: Form = {
    questions: [
      {
        title: '1',
        type: 'Checkbox',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
        showChildrenOn: ['A', 'B'],
        answer: ['A', 'B'],
        children: [
          {
            title: '2',
            type: 'Checkbox',
            isRequired: true,
            possibleAnswers: ['A', 'B', 'C'],
            showChildrenOn: ['A', 'B'],
            answer: ['C'],
            children: [
              {
                title: '3',
                type: 'Num',
                isRequired: true,
                answer: 3,
              },
            ],
          },
        ],
      },
    ],
  };

  expect(getAnswers(form)).toEqual({
    '1': ['A', 'B'],
    '2': ['C'],
  });

  form = {
    questions: [
      {
        title: '1',
        type: 'Checkbox',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
        showChildrenOn: ['A', 'B'],
        answer: ['A', 'B'],
        children: [
          {
            title: '2',
            type: 'Radio',
            isRequired: true,
            possibleAnswers: ['A', 'B', 'C'],
            showChildrenOn: ['A', 'B'],
            answer: 'B',
            children: [
              {
                title: '3',
                type: 'Num',
                isRequired: true,
                answer: 3,
              },
            ],
          },
        ],
      },
    ],
  };

  expect(getAnswers(form)).toEqual({
    '1': ['A', 'B'],
    '2': 'B',
    '3': 3,
  });
});

test('Test isFormComplete', () => {
  let form: Form = {
    questions: [
      {
        title: '1',
        type: 'Checkbox',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
        showChildrenOn: ['A', 'B'],
        answer: ['A', 'B'],
        children: [
          {
            title: '2',
            type: 'Checkbox',
            isRequired: true,
            possibleAnswers: ['A', 'B', 'C'],
            showChildrenOn: ['A', 'B'],
            answer: ['C'],
            children: [
              {
                title: '3',
                type: 'Num',
                isRequired: true,
                answer: 3,
              },
            ],
          },
        ],
      },
    ],
  };

  expect(isFormComplete(form)).toEqual(true);

  form = {
    questions: [
      {
        title: '1',
        type: 'Checkbox',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
        showChildrenOn: ['A', 'B'],
        answer: ['A', 'B'],
        children: [
          {
            title: '2',
            type: 'Radio',
            isRequired: true,
            possibleAnswers: ['A', 'B', 'C'],
            showChildrenOn: ['A', 'B'],
            answer: 'B',
            children: [
              {
                title: '3',
                type: 'Num',
                isRequired: true,
                answer: 3,
              },
            ],
          },
        ],
      },
    ],
  };

  expect(isFormComplete(form)).toEqual(true);

  form = {
    questions: [
      {
        title: '1',
        type: 'Checkbox',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
        showChildrenOn: ['A', 'B'],
        answer: ['A', 'B'],
        children: [
          {
            title: '2',
            type: 'Radio',
            isRequired: true,
            possibleAnswers: ['A', 'B', 'C'],
            showChildrenOn: ['A', 'B'],
            answer: 'B',
            children: [
              {
                title: '3',
                type: 'Num',
                isRequired: true,
              },
            ],
          },
        ],
      },
    ],
  };

  expect(isFormComplete(form)).toEqual(false);
});
