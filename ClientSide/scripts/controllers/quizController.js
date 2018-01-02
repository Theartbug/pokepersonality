'use strict';

app = app || {};

(function(module) {
    const quizControl = {};
    const selections = {};

    quizControl.combineSelections = (selectionName, selection) => {
        selections[`${selectionName}`] = selection;
        console.log(selections);
    };

    quizControl.endQuiz = () => {

    };

    quizControl.changePokeGender = (genderRatio) => {
        if (genderRatio > 0) {
            return `${genderRatio/8}% female`;
        } else if (genderRatio === 0) {
            return '100% male';
        } else {
            return 'genderless';
        }
    };

    module.quizControl = quizControl;

})(app);