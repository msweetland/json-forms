"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeGuards_1 = require("./typeGuards");
var SimpleSurvey = /** @class */ (function () {
    function SimpleSurvey(stringSurvey) {
        var _this = this;
        this.stringSurvey = function () { return JSON.stringify(_this._survey); };
        this._survey = this.parseSurveyString(stringSurvey);
    }
    SimpleSurvey.prototype.parseSurveyString = function (stringSurvey) {
        var survey = JSON.parse(stringSurvey);
        if (typeGuards_1.isSurvey(survey)) {
            return survey;
        }
        // check if all end can be reached
        throw Error('Not a valid survey object');
    };
    return SimpleSurvey;
}());
exports.SimpleSurvey = SimpleSurvey;
var validCheckboxSurvey = {
    questions: {
        0: {
            type: 'Checkbox',
            answers: ['yes', 'no'],
            userAnswer: [],
            nextQuestion: 0,
            showIf: 1,
        },
    },
    version: 1,
    name: 'Insurance Application',
    startQuestion: 0,
    endQuestions: [0],
};
var stringSurvey = JSON.stringify(validCheckboxSurvey);
var survey = new SimpleSurvey(stringSurvey);
console.log(survey);
//# sourceMappingURL=index.js.map