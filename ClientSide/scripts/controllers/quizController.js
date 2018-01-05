'use strict';

app = app || {};

(function(module) {
    const quizControl = {};

    quizControl.selections = {};

    quizControl.combineSelections = (selectionName, selection) => {
        quizControl.selections[`${selectionName}`] = selection;
    };

    quizControl.clearQuiz = () => {
        quizControl.selections = {};
        $('.match').empty();
        $('input[type="radio"]').prop('checked', false);
    };

    quizControl.changePokeGender = (genderRatio) => {
        if (genderRatio > 0) {
            return `${(genderRatio/8) * 100}% female`;
        } else if (genderRatio === 0) {
            return '100% male';
        } else {
            return 'genderless';
        }
    };

    module.quizControl = quizControl;

})(app);