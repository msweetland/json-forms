"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeGuards_1 = require("./typeGuards");
var SimpleSurvey = /** @class */ (function () {
    function SimpleSurvey(stringSurvey) {
        var _this = this;
        this.stringSurvey = function () { return JSON.stringify(_this._survey); };
        this.survey = function () { return _this._survey; };
        this.answerQuestion = function (questionIdx, answerType, answer) {
            // for each index check if valid sub index
            // if (questionIdx >= 0 && questionIdx < this._survey.questions.length) {
            //   // if answer type matches the answer type of the question
            // } else {
            //   throw Error('Question index out of range.');
            // }
        };
        this.isComplete = function () {
            var isCompletehelper = function (quest) {
                var userAnswer = quest.userAnswer, children = quest.children, showChildrenOn = quest.showChildrenOn, isRequired = quest.isRequired;
                // if question not answered and not required and doesn't have children return true
                if (!userAnswer && !isRequired) {
                    return true;
                }
                // if answered and answer == showChildren and children check children
                else if (children && )
                    ;
                else if (children) {
                    return;
                }
                if (userAnswer) {
                }
                // check children if question is correct answer and has children
                // if 
                if (quest.isRequired)
                    ;
            };
            for (var _i = 0, _a = _this._survey.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                question.
                ;
            }
            //  get all possible questions
            // linked list traverse to see if question is end
            return true;
        };
        this._survey = this.parseSurveyString(stringSurvey);
    }
    SimpleSurvey.prototype.parseSurveyString = function (stringSurvey) {
        var survey = JSON.parse(stringSurvey);
        if (typeGuards_1.isSurvey(survey)) {
            return survey;
        }
        throw Error('Not a valid survey.');
    };
    return SimpleSurvey;
}());
exports.SimpleSurvey = SimpleSurvey;
//# sourceMappingURL=index.js.map