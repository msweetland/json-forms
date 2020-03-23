import Joi from 'joi';
import {
  Question,
  FormType,
  CheckboxForm,
  EmailForm,
  NumForm,
  RadioForm,
  RangeForm,
  TextForm,
  TimeForm,
  Form,
} from './types';

const formTypes = [
  'Checkbox',
  'Email',
  'Num',
  'Radio',
  'Range',
  'Text',
  'Time',
];

const formTypeSchema = Joi.string().equal(...formTypes);

const questionSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    type: formTypeSchema,
    title: Joi.string().required(),
    description: Joi.string().optional(),
    isRequired: Joi.boolean().required(),
    children: Joi.array()
      .items(Joi.lazy(() => questionSchema))
      .when('showChildrenOn', {
        is: Joi.alternatives()
          .try(
            Joi.array()
              .unique()
              .min(1)
              .items(Joi.string()),
            Joi.boolean().valid(true)
          )
          .required(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
  })
  .unknown(true);

export const hasUniqueTitles = (questions: Question[]): Set<string> => {
  const titles = new Set<string>();
  const helper = (quest: Question): void => {
    if (titles.has(quest.title)) {
      throw Error('Duplicate question titles.');
    }

    titles.add(quest.title);
    (quest.children || []).forEach(helper);
  };
  questions.forEach(helper);
  return titles;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFormType = (s: any): s is FormType => {
  const { error } = Joi.validate(s, formTypeSchema);
  if (error) {
    throw Error(error.details[0].message);
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isQuestion = (object: any): object is Question => {
  const { error } = Joi.validate(object, questionSchema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCheckboxForm = (object: any): object is CheckboxForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Checkbox')
        .required(),
      possibleAnswers: Joi.array()
        .min(1)
        .items(Joi.string())
        .required(),
      showChildrenOn: Joi.alternatives()
        .try(
          Joi.array()
            .unique()
            .min(1)
            .items(Joi.string().equal(...object.possibleAnswers)),
          Joi.boolean().valid(true)
        )
        .optional(),
      answer: Joi.array()
        .unique()
        .min(1)
        .items(Joi.string().equal(...object.possibleAnswers))
        .optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmailForm = (object: any): object is EmailForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Email')
        .required(),
      showChildrenOn: Joi.boolean()
        .valid(true)
        .optional(),
      answer: Joi.string()
        .email()
        .optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumForm = (object: any): object is NumForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Num')
        .required(),
      showChildrenOn: Joi.boolean()
        .valid(true)
        .optional(),
      answer: Joi.number().optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRadioForm = (object: any): object is RadioForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Radio')
        .required(),
      possibleAnswers: Joi.array()
        .min(1)
        .unique()
        .items(Joi.string())
        .required(),
      showChildrenOn: Joi.alternatives()
        .try(
          Joi.array()
            .unique()
            .min(1)
            .items(Joi.string().equal(...object.possibleAnswers)),
          Joi.boolean().valid(true)
        )
        .optional(),
      answer: Joi.string()
        .equal(...object.possibleAnswers)
        .optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRangeForm = (object: any): object is RangeForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Range')
        .required(),
      showChildrenOn: Joi.boolean()
        .valid(true)
        .optional(),
      min: Joi.number()
        .less(object.max)
        .required(),
      max: Joi.number()
        .greater(object.min)
        .required(),
      answer: Joi.number()
        .min(object.min)
        .max(object.max)
        .optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTextForm = (object: any): object is TextForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Text')
        .required(),
      showChildrenOn: Joi.boolean()
        .valid(true)
        .optional(),
      answer: Joi.string().optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTimeForm = (object: any): object is TimeForm => {
  const schema = questionSchema
    .append({
      type: Joi.string()
        .equal('Time')
        .required(),
      showChildrenOn: Joi.boolean()
        .valid(true)
        .optional(),
      answer: Joi.date().optional(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isForm = (object: any): object is Form => {
  // recursive chech questions
  const schema = Joi.object({
    questions: Joi.array()
      .items(questionSchema)
      .required(),
    answers: Joi.object()
      .pattern(
        /^/,
        Joi.alternatives().try(
          Joi.string(),
          Joi.array()
            .min(1)
            .unique()
            .items(Joi.string()),
          Joi.number()
        )
      )
      .optional(),
  }).unknown(true);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  const validateQuestion = (q: Question): boolean => {
    (q.children || []).forEach(validateQuestion);

    switch (q.type) {
      case 'Checkbox':
        return isCheckboxForm(q);
      case 'Email':
        return isEmailForm(q);
      case 'Num':
        return isNumForm(q);
      case 'Radio':
        return isRadioForm(q);
      case 'Range':
        return isRangeForm(q);
      case 'Text':
        return isTextForm(q);
      case 'Time':
        return isTimeForm(q);
      default:
        throw new Error('Invalid Question Type');
    }
  };

  object.questions.forEach(validateQuestion);
  hasUniqueTitles(object.questions);
  return true;
};
