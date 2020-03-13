"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isPossibleAnswers = function (obj) {
    return (Array.isArray(obj) && lodash_1.default.every(obj, lodash_1.default.isString) && obj.length !== 0);
};
exports.isQuestionShowingChildren = function (quest) {
    if (typeof quest.showChildrenOn === 'boolean') {
        return quest.showChildrenOn;
    }
    else if (quest.userAnswer) {
        if (Array.isArray(quest.userAnswer)) {
            for (var answer in quest.userAnswer) {
                if (lodash_1.default.includes(quest.possibleAnswers, answer)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return lodash_1.default.includes(quest.possibleAnswers, quest.userAnswer);
        }
    }
    else {
        return false;
    }
};
exports.areAnswerNamesUnique = function (surv) {
    var answerNames = new Set();
    var isUniqueAnswerName = function (quest) {
        if (answerNames.has(quest.answerName)) {
            return false;
        }
        else {
            answerNames.add(quest.answerName);
        }
        if (quest.children) {
            var childrenUnique = quest.children.map(isUniqueAnswerName);
            return lodash_1.default.every(childrenUnique);
        }
        return true;
    };
    return lodash_1.default.every(surv.questions.map(isUniqueAnswerName));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isCheckbox = function (object) {
    var _a, _b;
    // check type is valid
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Checkbox') {
        return false;
    }
    // if user answers are not present
    if (!isPossibleAnswers((_b = object) === null || _b === void 0 ? void 0 : _b.possibleAnswers)) {
        return false;
    }
    if (object.children) {
        if (Array.isArray(object.showChildrenOn) &&
            lodash_1.default.every(object.showChildrenOn, lodash_1.default.isString)) {
            for (var _i = 0, _c = object.showChildrenOn; _i < _c.length; _i++) {
                var answer = _c[_i];
                if (!lodash_1.default.includes(object.possibleAnswers, answer)) {
                    return false;
                }
            }
        }
        else if (typeof object.showChildrenOn !== 'boolean') {
            return false;
        }
    }
    // check possibleAnswers
    if (object.userAnswer) {
        if (!Array.isArray(object.userAnswer)) {
            return false;
        }
        if (object.userAnswer.length === 0) {
            return false;
        }
        // check for no duplicate answers
        var answerSet = new Set(object.userAnswer);
        if (answerSet.size !== object.userAnswer.length) {
            return false;
        }
        for (var _d = 0, _e = object.userAnswer; _d < _e.length; _d++) {
            var answer = _e[_d];
            if (!lodash_1.default.includes(object.possibleAnswers, answer)) {
                return false;
            }
        }
    }
    return true;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isRadio = function (object) {
    var _a, _b;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Radio') {
        return false;
    }
    // if user answers are not present
    if (!isPossibleAnswers((_b = object) === null || _b === void 0 ? void 0 : _b.possibleAnswers)) {
        return false;
    }
    if (object.children) {
        if (Array.isArray(object.showChildrenOn) &&
            lodash_1.default.every(object.showChildrenOn, lodash_1.default.isString)) {
            for (var _i = 0, _c = object.showChildrenOn; _i < _c.length; _i++) {
                var answer = _c[_i];
                if (!lodash_1.default.includes(object.possibleAnswers, answer)) {
                    return false;
                }
            }
        }
        else if (typeof object.showChildrenOn !== 'boolean') {
            return false;
        }
    }
    return object.userAnswer
        ? typeof object.userAnswer === 'string' &&
            lodash_1.default.includes(object.possibleAnswers, object.userAnswer)
        : typeof object.userAnswer === 'undefined';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isEmail = function (object) {
    var _a;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Email') {
        return false;
    }
    if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
        return false;
    }
    if (object.userAnswer && typeof object.userAnswer === 'string') {
        var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(object.userAnswer);
    }
    return typeof object.userAnswer === 'undefined';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isNum = function (object) {
    var _a;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Num') {
        return false;
    }
    if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
        return false;
    }
    return object.userAnswer
        ? typeof object.userAnswer === 'number'
        : typeof object.userAnswer === 'undefined';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isRange = function (object) {
    var _a, _b, _c;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Range') {
        return false;
    }
    if (typeof ((_b = object) === null || _b === void 0 ? void 0 : _b.min) !== 'number' || typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.max) !== 'number') {
        return false;
    }
    if (object.max <= object.min) {
        return false;
    }
    if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
        return false;
    }
    if (object.userAnswer && typeof object.userAnswer === 'number') {
        return object.userAnswer >= object.min && object.userAnswer <= object.max;
    }
    return typeof object.userAnswer === 'undefined';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isText = function (object) {
    var _a;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Text') {
        return false;
    }
    if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
        return false;
    }
    return object.userAnswer
        ? typeof object.userAnswer === 'string'
        : typeof object.userAnswer === 'undefined';
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isTime = function (object) {
    var _a;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Time') {
        return false;
    }
    if (object.showChildrenOn && typeof object.showChildrenOn !== 'boolean') {
        return false;
    }
    if (object.userAnswer) {
        var formats = [
            'YYYY-MM-DD LT',
            'YYYY-MM-DD h:mm:ss A',
            'YYYY-MM-DD HH:mm:ss',
            'YYYY-MM-DD HH:mm',
        ];
        return moment_1.default(object.userAnswer, formats, true).isValid();
    }
    else {
        return typeof object.userAnswer === 'undefined';
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isQuestion = function (object) {
    var _a, _b, _c;
    if (typeof ((_a = object) === null || _a === void 0 ? void 0 : _a.title) !== 'string') {
        return false;
    }
    if (typeof ((_b = object) === null || _b === void 0 ? void 0 : _b.answerName) !== 'string') {
        return false;
    }
    if (typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.isRequired) !== 'boolean') {
        return false;
    }
    if (object.description && typeof object.description !== 'string') {
        return false;
    }
    if (object.metadata && typeof object.metadata !== 'string') {
        return false;
    }
    if (object.children && !object.showChildrenOn) {
        return false;
    }
    if (!object.children && object.showChildrenOn) {
        return false;
    }
    // check children
    if (!(exports.isCheckbox(object) ||
        exports.isEmail(object) ||
        exports.isNum(object) ||
        exports.isRadio(object) ||
        exports.isRange(object) ||
        exports.isTime(object) ||
        exports.isText(object))) {
        return false;
    }
    return true;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isSurvey = function (object) {
    var _a;
    if (typeof ((_a = object) === null || _a === void 0 ? void 0 : _a.name) !== 'string') {
        return false;
    }
    if (object.metadata && typeof object.metadata !== 'string') {
        return false;
    }
    if (Array.isArray(object.questions) && object.questions.length !== 0) {
        for (var _i = 0, _b = object.questions; _i < _b.length; _i++) {
            var question = _b[_i];
            if (!exports.isQuestion(question)) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    if (!exports.areAnswerNamesUnique(object)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=typeGuards.js.map