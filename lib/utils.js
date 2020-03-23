export var areChildrenVisible = function (quest) {
    if (!(quest.children && quest.showChildrenOn) || !quest.answer) {
        return false;
    }
    if (typeof quest.showChildrenOn === 'boolean') {
        return quest.showChildrenOn;
    }
    if (quest.type === 'Checkbox') {
        var possibles = new Set(quest.showChildrenOn);
        for (var _i = 0, _a = quest.answer; _i < _a.length; _i++) {
            var answer = _a[_i];
            if (possibles.has(answer)) {
                return true;
            }
        }
        return false;
    }
    if (quest.type === 'Radio') {
        return quest.possibleAnswers.indexOf(quest.answer) !== -1;
    }
    return true;
};
export var getAnswers = function (form) {
    var answers = {};
    var helper = function (quest) {
        if (quest.answer) {
            answers[quest.title] = quest.answer;
        }
        if (areChildrenVisible(quest)) {
            (quest.children || []).forEach(helper);
        }
    };
    form.questions.forEach(helper);
    return answers;
};
export var isFormComplete = function (form) {
    var helper = function (quest) {
        if (quest.isRequired && !quest.answer) {
            return false;
        }
        if (quest.children && areChildrenVisible(quest)) {
            return quest.children.map(helper).every(function (v) { return v; });
        }
        else {
            return true;
        }
    };
    return form.questions.map(helper).every(function (v) { return v; });
};
//# sourceMappingURL=utils.js.map