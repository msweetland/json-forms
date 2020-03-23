var _a;
import Joi from 'joi';
var formTypes = [
    'Checkbox',
    'Email',
    'Num',
    'Radio',
    'Range',
    'Text',
    'Time',
];
var formTypeSchema = (_a = Joi.string()).equal.apply(_a, formTypes);
var questionSchema = Joi.object()
    .keys({
    type: formTypeSchema,
    title: Joi.string().required(),
    description: Joi.string().optional(),
    isRequired: Joi.boolean().required(),
    children: Joi.array()
        .items(Joi.lazy(function () { return questionSchema; }))
        .when('showChildrenOn', {
        is: Joi.alternatives()
            .try(Joi.array()
            .unique()
            .min(1)
            .items(Joi.string()), Joi.boolean().valid(true))
            .required(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
})
    .unknown(true);
export var hasUniqueTitles = function (questions) {
    var titles = new Set();
    var helper = function (quest) {
        if (titles.has(quest.title)) {
            throw Error('Duplicate question titles.');
        }
        titles.add(quest.title);
        (quest.children || []).forEach(helper);
    };
    questions.forEach(helper);
    return titles;
};
export var isFormType = function (s) {
    var error = Joi.validate(s, formTypeSchema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isQuestion = function (object) {
    var error = Joi.validate(object, questionSchema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isCheckboxForm = function (object) {
    var _a, _b;
    var schema = questionSchema
        .append({
        type: Joi.string()
            .equal('Checkbox')
            .required(),
        possibleAnswers: Joi.array()
            .min(1)
            .items(Joi.string())
            .required(),
        showChildrenOn: Joi.alternatives()
            .try(Joi.array()
            .unique()
            .min(1)
            .items((_a = Joi.string()).equal.apply(_a, object.possibleAnswers)), Joi.boolean().valid(true))
            .optional(),
        answer: Joi.array()
            .unique()
            .min(1)
            .items((_b = Joi.string()).equal.apply(_b, object.possibleAnswers))
            .optional(),
    })
        .unknown(false);
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isEmailForm = function (object) {
    var schema = questionSchema
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
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isNumForm = function (object) {
    var schema = questionSchema
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
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isRadioForm = function (object) {
    var _a, _b;
    var schema = questionSchema
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
            .try(Joi.array()
            .unique()
            .min(1)
            .items((_a = Joi.string()).equal.apply(_a, object.possibleAnswers)), Joi.boolean().valid(true))
            .optional(),
        answer: (_b = Joi.string()).equal.apply(_b, object.possibleAnswers).optional(),
    })
        .unknown(false);
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isRangeForm = function (object) {
    var schema = questionSchema
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
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isTextForm = function (object) {
    var schema = questionSchema
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
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isTimeForm = function (object) {
    var schema = questionSchema
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
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
export var isForm = function (object) {
    var schema = Joi.object({
        questions: Joi.array()
            .items(questionSchema)
            .required(),
        answers: Joi.object()
            .pattern(/^/, Joi.alternatives().try(Joi.string(), Joi.array()
            .min(1)
            .unique()
            .items(Joi.string()), Joi.number()))
            .optional(),
    }).unknown(true);
    var error = Joi.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    var validateQuestion = function (q) {
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
//# sourceMappingURL=typeGuards.js.map