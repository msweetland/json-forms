"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isListSameType = function (obj, type) {
    if (Array.isArray(obj) && obj.length > 0) {
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var val = obj_1[_i];
            if (typeof val !== type) {
                return false;
            }
        }
        return true;
    }
    return false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isCheckbox = function (object) {
    var _a, _b, _c, _d, _e;
    return (((_a = object) === null || _a === void 0 ? void 0 : _a.type) === 'Checkbox' &&
        isListSameType((_b = object) === null || _b === void 0 ? void 0 : _b.answers, 'string') &&
        (Array.isArray((_c = object) === null || _c === void 0 ? void 0 : _c.userAnswer) ||
            isListSameType((_d = object) === null || _d === void 0 ? void 0 : _d.userAnswer, 'string')) &&
        typeof ((_e = object) === null || _e === void 0 ? void 0 : _e.type) === 'number');
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isSurvey = function (object) {
    var _a, _b, _c, _d;
    if (typeof ((_a = object) === null || _a === void 0 ? void 0 : _a.version) !== 'number') {
        return false;
    }
    if (typeof ((_b = object) === null || _b === void 0 ? void 0 : _b.name) !== 'string') {
        return false;
    }
    if (typeof ((_c = object) === null || _c === void 0 ? void 0 : _c.startQuestion) !== 'number') {
        return false;
    }
    if (!isListSameType((_d = object) === null || _d === void 0 ? void 0 : _d.endQuestions, 'number')) {
        return false;
    }
    if (!object.questions) {
        return false;
    }
    else {
        for (var _i = 0, _e = object.questions; _i < _e.length; _i++) {
            var val = _e[_i];
            if (!isCheckbox(val)) {
                return false;
            }
        }
    }
    return true;
};
//# sourceMappingURL=typeGuards.js.map