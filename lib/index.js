import { isSurvey } from './typeGuards';
var SimpleSurvey = /** @class */ (function () {
    function SimpleSurvey(stringSurvey) {
        var _this = this;
        this.stringSurvey = function () { return JSON.stringify(_this._survey); };
        this._survey = this.parseSurveyString(stringSurvey);
    }
    SimpleSurvey.prototype.parseSurveyString = function (stringSurvey) {
        var survey = JSON.parse(stringSurvey);
        if (isSurvey(survey)) {
            return survey;
        }
        // check if all end can be reached
        throw Error('Not a valid survey object');
    };
    return SimpleSurvey;
}());
export { SimpleSurvey };
//# sourceMappingURL=index.js.map