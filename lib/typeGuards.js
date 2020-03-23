"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var formTypes = [
    'Checkbox',
    'Email',
    'Num',
    'Radio',
    'Range',
    'Text',
    'Time',
];
var formTypeSchema = (_a = joi_1.default.string()).equal.apply(_a, formTypes);
var questionSchema = joi_1.default.object()
    .keys({
    type: formTypeSchema,
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    isRequired: joi_1.default.boolean().required(),
    children: joi_1.default.array()
        .items(joi_1.default.lazy(function () { return questionSchema; }))
        .when('showChildrenOn', {
        is: joi_1.default.alternatives()
            .try(joi_1.default.array()
            .unique()
            .min(1)
            .items(joi_1.default.string()), joi_1.default.boolean().valid(true))
            .required(),
        then: joi_1.default.required(),
        otherwise: joi_1.default.forbidden(),
    }),
})
    .unknown(true);
exports.hasUniqueTitles = function (questions) {
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
exports.isFormType = function (s) {
    var error = joi_1.default.validate(s, formTypeSchema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isQuestion = function (object) {
    var error = joi_1.default.validate(object, questionSchema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isCheckboxForm = function (object) {
    var _a, _b;
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Checkbox')
            .required(),
        possibleAnswers: joi_1.default.array()
            .min(1)
            .items(joi_1.default.string())
            .required(),
        showChildrenOn: joi_1.default.alternatives()
            .try(joi_1.default.array()
            .unique()
            .min(1)
            .items((_a = joi_1.default.string()).equal.apply(_a, object.possibleAnswers)), joi_1.default.boolean().valid(true))
            .optional(),
        answer: joi_1.default.array()
            .unique()
            .min(1)
            .items((_b = joi_1.default.string()).equal.apply(_b, object.possibleAnswers))
            .optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isEmailForm = function (object) {
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Email')
            .required(),
        showChildrenOn: joi_1.default.boolean()
            .valid(true)
            .optional(),
        answer: joi_1.default.string()
            .email()
            .optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isNumForm = function (object) {
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Num')
            .required(),
        showChildrenOn: joi_1.default.boolean()
            .valid(true)
            .optional(),
        answer: joi_1.default.number().optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isRadioForm = function (object) {
    var _a, _b;
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Radio')
            .required(),
        possibleAnswers: joi_1.default.array()
            .min(1)
            .unique()
            .items(joi_1.default.string())
            .required(),
        showChildrenOn: joi_1.default.alternatives()
            .try(joi_1.default.array()
            .unique()
            .min(1)
            .items((_a = joi_1.default.string()).equal.apply(_a, object.possibleAnswers)), joi_1.default.boolean().valid(true))
            .optional(),
        answer: (_b = joi_1.default.string()).equal.apply(_b, object.possibleAnswers).optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isRangeForm = function (object) {
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Range')
            .required(),
        showChildrenOn: joi_1.default.boolean()
            .valid(true)
            .optional(),
        min: joi_1.default.number()
            .less(object.max)
            .required(),
        max: joi_1.default.number()
            .greater(object.min)
            .required(),
        answer: joi_1.default.number()
            .min(object.min)
            .max(object.max)
            .optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isTextForm = function (object) {
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Text')
            .required(),
        showChildrenOn: joi_1.default.boolean()
            .valid(true)
            .optional(),
        answer: joi_1.default.string().optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isTimeForm = function (object) {
    var schema = questionSchema
        .append({
        type: joi_1.default.string()
            .equal('Time')
            .required(),
        showChildrenOn: joi_1.default.boolean()
            .valid(true)
            .optional(),
        answer: joi_1.default.date().optional(),
    })
        .unknown(false);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    return true;
};
exports.isForm = function (object) {
    var schema = joi_1.default.object({
        questions: joi_1.default.array()
            .items(questionSchema)
            .required(),
        answers: joi_1.default.object()
            .pattern(/^/, joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.array()
            .min(1)
            .unique()
            .items(joi_1.default.string()), joi_1.default.number()))
            .optional(),
    }).unknown(true);
    var error = joi_1.default.validate(object, schema).error;
    if (error) {
        throw Error(error.details[0].message);
    }
    var validateQuestion = function (q) {
        (q.children || []).forEach(validateQuestion);
        switch (q.type) {
            case 'Checkbox':
                return exports.isCheckboxForm(q);
            case 'Email':
                return exports.isEmailForm(q);
            case 'Num':
                return exports.isNumForm(q);
            case 'Radio':
                return exports.isRadioForm(q);
            case 'Range':
                return exports.isRangeForm(q);
            case 'Text':
                return exports.isTextForm(q);
            case 'Time':
                return exports.isTimeForm(q);
            default:
                throw new Error('Invalid Question Type');
        }
    };
    object.questions.forEach(validateQuestion);
    exports.hasUniqueTitles(object.questions);
    return true;
};
//# sourceMappingURL=typeGuards.js.map