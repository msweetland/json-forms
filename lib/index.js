"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeGuards_1 = require("./typeGuards");
var utils_1 = require("./utils");
var Base = (function () {
    function Base(formString) {
        var _this = this;
        this.isComplete = function () { return utils_1.isFormComplete(_this.form); };
        this.answers = function () {
            _this.form.answers = utils_1.getAnswers(_this.form);
            return _this.form.answers;
        };
        this.answerQuestion = function (questionIdxs, answerType, answer) {
            var copy = __assign({}, _this.form);
            var questions = copy.questions;
            try {
                for (var _i = 0, _a = questionIdxs.splice(0, questionIdxs.length - 1); _i < _a.length; _i++) {
                    var idx = _a[_i];
                    var next = questions[idx].children;
                    if (next)
                        questions = next;
                    else
                        throw Error('Answer Index out of range or no children present');
                }
            }
            catch (error) {
                return false;
            }
            try {
                var lastIdx = questionIdxs[questionIdxs.length - 1];
                var lastQuestion = questions[lastIdx];
                if (lastQuestion.type === answerType) {
                    lastQuestion.answer = answer;
                    typeGuards_1.isForm(copy);
                    _this.form = copy;
                }
                else
                    throw Error();
            }
            catch (error) {
                return false;
            }
            return true;
        };
        this.form = this.parseFromString(formString);
    }
    Base.prototype.parseFromString = function (stringSurvey) {
        var survey = JSON.parse(stringSurvey);
        if (typeGuards_1.isForm(survey))
            return survey;
        else
            throw Error();
    };
    Base.validateForm = function (obj) { return typeGuards_1.isForm(obj); };
    return Base;
}());
exports.default = Base;
//# sourceMappingURL=index.js.map