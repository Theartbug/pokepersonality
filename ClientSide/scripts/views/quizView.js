'use strict';

app = app || {};

(function(module) {
    const quizView = {};

    quizView.initQuiz = () => {
        quizView.changeQuestion();
        quizView.playAgain();
    };

    quizView.playAgain = () => {
        $('#play-again').on('click', function() {
            app.quizControl.clearQuiz();
            //TODO: hide results / show first question
        });
    };

    quizView.changeQuestion = () => {
        $('input[type="radio"]').on('click', function() {
            app.quizControl.combineSelections($(this).attr('name'), $(this).val().split(' '));
            // TODO: jquery animation to move questions on and off screen
            if ($(this).parent().attr('id') === 'gender') { //if the last question was selected, send the data
                app.quizData.getMatch(app.quizControl.selections);
            }
        });
    };

    quizView.displayResults = () => {
        for (let i = 0; i < app.pokeBuilder.results.length; i++) { //if more than one result is going to be displayed
            $('.match').append(app.pokeBuilder.results[i].toHtml('#match-template'));
            console.log(app.pokeBuilder.results[i]);
        }
    };

    module.quizView = quizView;

})(app);