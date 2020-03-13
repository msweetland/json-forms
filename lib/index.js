"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var typeGuards_1 = require("./typeGuards");
var JsonSurvey = /** @class */ (function () {
    function JsonSurvey(stringSurvey) {
        var _this = this;
        this.stringSurvey = function () { return JSON.stringify(_this._survey); };
        this.survey = function () { return _this._survey; };
        this.answerQuestion = function (questionIdxs, answerType, answer) {
            var questions = _this._survey.questions;
            for (var _i = 0, _a = questionIdxs.splice(0, questionIdxs.length - 1); _i < _a.length; _i++) {
                var idx = _a[_i];
                if (questions[idx].children) {
                    questions = questions[idx].children;
                }
                else {
                    throw Error('Answer Index out of range or no children present');
                }
            }
            var lastIdx = questionIdxs[questionIdxs.length - 1];
            if (questions[lastIdx]) {
                var clone = JSON.parse(JSON.stringify(questions[lastIdx]));
                if (clone.type !== answerType) {
                    throw Error('Answer types do not match.');
                }
                clone.userAnswer = answer;
                if (!typeGuards_1.isQuestion(clone)) {
                    throw Error('Invalid answer.');
                }
                questions[lastIdx] = clone;
            }
            else {
                throw Error('Answer Index out of range or no children present.');
            }
        };
        this.getAnswerObj = function () {
            var answers = {};
            var addAnswers = function (quest) {
                answers[quest.answerName] = quest.userAnswer;
                (quest.children || []).forEach(addAnswers);
            };
            _this._survey.questions.forEach(addAnswers);
            return answers;
        };
        this.isComplete = function () {
            var isQuestionComplete = function (quest) {
                if (quest.isRequired && !quest.userAnswer) {
                    return false;
                }
                // is showing children check if children are required
                if (quest.children && typeGuards_1.isQuestionShowingChildren(quest)) {
                    console.log('checking if children are complete');
                    return lodash_1.default.every(quest.children.map(isQuestionComplete));
                }
                return true;
            };
            return lodash_1.default.every(_this._survey.questions.map(isQuestionComplete));
        };
        this._survey = this.parseSurveyString(stringSurvey);
    }
    JsonSurvey.prototype.parseSurveyString = function (stringSurvey) {
        var survey = JSON.parse(stringSurvey);
        if (typeGuards_1.isSurvey(survey)) {
            return survey;
        }
        throw Error('Not a valid survey.');
    };
    JsonSurvey.validateSurvey = function (obj) { return typeGuards_1.isSurvey(obj); };
    return JsonSurvey;
}());
exports.JsonSurvey = JsonSurvey;
//# sourceMappingURL=index.js.map