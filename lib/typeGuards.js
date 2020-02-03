"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isPossibleAnswers = function (obj) {
    return (Array.isArray(obj) && lodash_1.default.every(obj, lodash_1.default.isString) && obj.length !== 0);
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
        for (var _i = 0, _c = object.userAnswer; _i < _c.length; _i++) {
            var answer = _c[_i];
            if (!lodash_1.default.includes(object.possibleAnswers, answer)) {
                return false;
            }
        }
    }
    return true;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isEmail = function (object) {
    var _a, _b, _c;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Email') {
        return false;
    }
    if (object.userAnswer && typeof ((_b = object) === null || _b === void 0 ? void 0 : _b.userAnswer) !== 'string') {
        if (typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.userAnswer) !== 'string') {
            return false;
        }
        else {
            // test valid email
            var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return emailRegex.test(object.userAnswer);
        }
    }
    return true;
};
exports.isNum = function (object) {
    var _a, _b, _c;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Number') {
        return false;
    }
    if (typeof ((_b = object) === null || _b === void 0 ? void 0 : _b.userAnswer) !== 'undefined' ||
        typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.userAnswer) !== 'number') {
        return false;
    }
    return true;
};
exports.isRadio = function (object) {
    var _a, _b, _c, _d;
    if (((_a = object) === null || _a === void 0 ? void 0 : _a.type) !== 'Number') {
        return false;
    }
    // if user answers are not present
    if (!isPossibleAnswers((_b = object) === null || _b === void 0 ? void 0 : _b.possibleAnswers)) {
        return false;
    }
    if (typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.userAnswer) === 'undefined' ||
        typeof ((_d = object) === null || _d === void 0 ? void 0 : _d.userAnswer) !== 'string') {
        return false;
    }
    return true;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isSurvey = function (object) {
    var _a, _b;
    if (typeof ((_a = object) === null || _a === void 0 ? void 0 : _a.name) !== 'string') {
        return false;
    }
    if (!((_b = object) === null || _b === void 0 ? void 0 : _b.questions)) {
        return false;
    }
    else if (Object.keys(object.questions).length === 0) {
        return false;
    }
    else {
        for (var _i = 0, _c = object.questions; _i < _c.length; _i++) {
            var val = _c[_i];
            if (!exports.isCheckbox(val) || !exports.isEmail(val)) {
                return false;
            }
        }
    }
    return true;
};
//# sourceMappingURL=typeGuards.js.map