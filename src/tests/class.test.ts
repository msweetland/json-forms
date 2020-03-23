import FormClass from '..';

test('Test FormClass', () => {
  const testobj: Form = {
    questions: [
      {
        type: 'Checkbox',
        title: 'A',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
      },
      {
        type: 'Checkbox',
        title: 'B',
        isRequired: true,
        possibleAnswers: ['A', 'B', 'C'],
      },
    ],
  };

  const form = new FormClass(JSON.stringify(testobj));
  expect(form.answerQuestion([0], 'Checkbox', ['A', 'B'])).toEqual(true);
  expect(form.answerQuestion([0, 1, 2], 'Checkbox', 'A')).toEqual(false);
  expect(form.isComplete()).toEqual(false);
  expect(form.answerQuestion([1], 'Checkbox', ['A', 'B'])).toEqual(true);
  expect(form.isComplete()).toEqual(true);
  expect(form.answers()).toEqual({
    A: ['A', 'B'],
    B: ['A', 'B'],
  });
});
