import Joi from 'joi';

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
      type: Joi.string().equal('Checkbox'),
      possibleAnswers: Joi.array()
        .min(1)
        .items(Joi.string()),
      showChildrenOn: Joi.alternatives().try(
        Joi.array()
          .unique()
          .min(1)
          .items(Joi.string().equal(...object.possibleAnswers)),
        Joi.boolean().valid(true)
      ),
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
      type: Joi.string().equal('Email'),
      showChildrenOn: Joi.boolean().valid(true),
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
      type: Joi.string().equal('Num'),
      showChildrenOn: Joi.boolean().valid(true),
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
      type: Joi.string().equal('Radio'),
      possibleAnswers: Joi.array()
        .min(1)
        .unique()
        .items(Joi.string()),
      showChildrenOn: Joi.alternatives().try(
        Joi.array()
          .unique()
          .min(1)
          .items(Joi.string().equal(...object.possibleAnswers)),
        Joi.boolean().valid(true)
      ),
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
      type: Joi.string().equal('Range'),
      showChildrenOn: Joi.boolean().valid(true),
      min: Joi.number()
        .less(object.max)
        .required(),
      max: Joi.number()
        .greater(object.min)
        .required(),
      answer: Joi.number()
        .optional()
        .min(object.min)
        .max(object.max),
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
      type: Joi.string().equal('Text'),
      showChildrenOn: Joi.boolean().valid(true),
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
      type: Joi.string().equal('Time'),
      showChildrenOn: Joi.boolean().valid(true),
      answer: Joi.date(),
    })
    .unknown(false);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  return true;
};

export const isForm = (object: any): object is Form => {
  // recursive chech questions

  const schema = Joi.object({
    questions: Joi.array()
      .items(questionSchema)
      .required(),
    answers: Joi.object().pattern(
      /^/,
      Joi.alternatives().try(
        Joi.string(),
        Joi.array()
          .min(1)
          .unique()
          .items(Joi.string()),
        Joi.number()
      )
    ),
  }).unknown(true);

  const { error } = Joi.validate(object, schema);
  if (error) {
    throw Error(error.details[0].message);
  }

  const validateQuestion = (q: Question): boolean => {
    if (q.children) {
      q.children.forEach(validateQuestion);
    }

    switch (q.type) {
      case 'Checkbox':
        return isCheckboxForm(q);
      case 'Email':
        return isEmailForm(q);
      case 'Num':
        return isNumForm(q);
      case 'Radio':
        return isRadioForm(q);
      // case 'Range':
      //   retur
      case 'Text':
        return isTextForm(q);
      case 'Time':
        return isTimeForm(q);
      default:
        throw new Error('Invalid Question Type');
    }
  };

  object.questions.forEach(validateQuestion);
  return true;
};

// // import _ from 'lodash';
// // import moment from 'moment';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isPossibleAnswers = (obj: any): obj is string[] => {
//   return (
//     Array.isArray(obj) && _.every(obj, _.isString) && (obj as []).length !== 0
//   );
// };

// export const isQuestionShowingChildren = (quest: Question): boolean => {
//   if (typeof quest.showChildrenOn === 'boolean') {
//     return quest.showChildrenOn;
//   } else if (quest.userAnswer) {
//     if (Array.isArray(quest.userAnswer)) {
//       for (const answer in quest.userAnswer) {
//         if (_.includes(quest.possibleAnswers, answer)) {
//           return false;
//         }
//       }
//       return true;
//     } else {
//       return _.includes(quest.possibleAnswers, quest.userAnswer);
//     }
//   } else {
//     return false;
//   }
// };

// export const areAnswerNamesUnique = (surv: Survey): boolean => {
//   const answerNames = new Set<string>();
//   const isUniqueAnswerName = (quest: Question): boolean => {
//     if (answerNames.has(quest.answerName)) {
//       return false;
//     } else {
//       answerNames.add(quest.answerName);
//     }

//     if (quest.children) {
//       const childrenUnique: boolean[] = quest.children.map(isUniqueAnswerName);
//       return _.every(childrenUnique);
//     }
//     return true;
//   };

//   return _.every(surv.questions.map(isUniqueAnswerName));
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isCheckbox = (object: any): object is CheckboxForm => {
//   // check type is valid
//   if (object?.type !== 'Checkbox') {
//     return false;
//   }

//   // if user answers are not present
//   if (!isPossibleAnswers(object?.possibleAnswers)) {
//     return false;
//   }

//   if (object.children) {
//     if (
//       Array.isArray(object.showChildrenOn) &&
//       _.every(object.showChildrenOn, _.isString)
//     ) {
//       for (const answer of object.showChildrenOn) {
//         if (!_.includes(object.possibleAnswers as string[], answer as string)) {
//           return false;
//         }
//       }
//     } else if (typeof object.showChildrenOn !== 'boolean') {
//       return false;
//     }
//   }

//   // check possibleAnswers
//   if (object.userAnswer) {
//     if (!Array.isArray(object.userAnswer)) {
//       return false;
//     }

//     if (object.userAnswer.length === 0) {
//       return false;
//     }
//     // check for no duplicate answers
//     const answerSet = new Set(object.userAnswer);
//     if (answerSet.size !== object.userAnswer.length) {
//       return false;
//     }

//     for (const answer of object.userAnswer) {
//       if (!_.includes(object.possibleAnswers as string[], answer as string)) {
//         return false;
//       }
//     }
//   }

//   return true;
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isRadio = (object: any): object is RadioForm => {
//   if (object?.type !== 'Radio') {
//     return false;
//   }

//   // if user answers are not present
//   if (!isPossibleAnswers(object?.possibleAnswers)) {
//     return false;
//   }

//   if (object.children) {
//     if (
//       Array.isArray(object.showChildrenOn) &&
//       _.every(object.showChildrenOn, _.isString)
//     ) {
//       for (const answer of object.showChildrenOn) {
//         if (!_.includes(object.possibleAnswers as string[], answer as string)) {
//           return false;
//         }
//       }
//     } else if (typeof object.showChildrenOn !== 'boolean') {
//       return false;
//     }
//   }

//   return object.userAnswer
//     ? typeof object.userAnswer === 'string' &&
//         _.includes(object.possibleAnswers, object.userAnswer)
//     : typeof object.userAnswer === 'undefined';
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isEmail = (object: any): object is EmailForm => {
//   if (object?.type !== 'Email') {
//     return false;
//   }

//   if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
//     return false;
//   }

//   if (object.userAnswer && typeof object.userAnswer === 'string') {
//     const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     return emailRegex.test(object.userAnswer as string);
//   }

//   return typeof object.userAnswer === 'undefined';
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isNum = (object: any): object is NumForm => {
//   if (object?.type !== 'Num') {
//     return false;
//   }

//   if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
//     return false;
//   }

//   return object.userAnswer
//     ? typeof object.userAnswer === 'number'
//     : typeof object.userAnswer === 'undefined';
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isRange = (object: any): object is RangeForm => {
//   if (object?.type !== 'Range') {
//     return false;
//   }

//   if (typeof object?.min !== 'number' || typeof object?.max !== 'number') {
//     return false;
//   }

//   if (object.max <= object.min) {
//     return false;
//   }

//   if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
//     return false;
//   }

//   if (object.userAnswer && typeof object.userAnswer === 'number') {
//     return object.userAnswer >= object.min && object.userAnswer <= object.max;
//   }

//   return typeof object.userAnswer === 'undefined';
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isText = (object: any): object is TextForm => {
//   if (object?.type !== 'Text') {
//     return false;
//   }

//   if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
//     return false;
//   }

//   return object.userAnswer
//     ? typeof object.userAnswer === 'string'
//     : typeof object.userAnswer === 'undefined';
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isTime = (object: any): object is TextForm => {
//   if (object?.type !== 'Time') {
//     return false;
//   }

//   if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
//     return false;
//   }

//   if (object.userAnswer) {
//     const formats = [
//       'YYYY-MM-DD LT',
//       'YYYY-MM-DD h:mm:ss A',
//       'YYYY-MM-DD HH:mm:ss',
//       'YYYY-MM-DD HH:mm',
//     ];

//     return moment(object.userAnswer, formats, true).isValid();
//   } else {
//     return typeof object.userAnswer === 'undefined';
//   }
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isQuestion = (object: any): object is Question => {
//   if (typeof object?.title !== 'string') {
//     return false;
//   }

//   if (typeof object?.answerName !== 'string') {
//     return false;
//   }

//   if (typeof object?.isRequired !== 'boolean') {
//     return false;
//   }

//   if (object.description && typeof object.description !== 'string') {
//     return false;
//   }

//   if (object.metadata && typeof object.metadata !== 'string') {
//     return false;
//   }

//   if (object.children && !object.showChildrenOn) {
//     return false;
//   }

//   if (!object.children && object.showChildrenOn) {
//     return false;
//   }

//   // check children
//   if (
//     !(
//       isCheckbox(object) ||
//       isEmail(object) ||
//       isNum(object) ||
//       isRadio(object) ||
//       isRange(object) ||
//       isTime(object) ||
//       isText(object)
//     )
//   ) {
//     return false;
//   }
//   return true;
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const isSurvey = (object: any): object is Survey => {
//   if (typeof object?.name !== 'string') {
//     return false;
//   }
//   if (object.metadata && typeof object.metadata !== 'string') {
//     return false;
//   }

//   if (Array.isArray(object.questions) && object.questions.length !== 0) {
//     for (const question of object.questions) {
//       if (!isQuestion(question)) {
//         return false;
//       }
//     }
//   } else {
//     return false;
//   }

//   if (!areAnswerNamesUnique(object)) {
//     return false;
//   }

//   return true;
// };
