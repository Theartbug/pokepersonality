'use strict';

app = app || {};

(function(module) {
    const quizView = {};

    quizView.initQuiz = () => {
        quizView.changeQuestion();
        quizView.playAgain();
        $('section').hide();
        $('#type-question').show();
    };

    quizView.playAgain = () => {
        $('#play-again').on('click', function() {
            $('#results').fadeOut(1000, app.quizControl.clearQuiz); //make sure the quiz is not cleared prematurely
            $('#type-question').delay(500).fadeIn(1000);
        });
    };

    quizView.changeQuestion = () => {
        $('input[type="radio"]').on('click', function() {
            app.quizControl.combineSelections($(this).attr('name'), $(this).val().split(' '));
            if ($(this).parent().attr('id') === 'gender') { //if the last question was selected, send the data
                app.quizData.getMatch(app.quizControl.selections, () => { //makes sure there is a result to show
                    $('#gender-question').fadeOut(1000);
                    $('#results').delay(500).fadeIn(1000);
                });
            } else {
                $(this).parent().parent().slideUp('slow');
                $(this).parent().parent().next().delay(400).slideDown('slow');

                // $(this).parent().parent().hide('slide', {direction: 'left'}, 1000);
                // $(this).parent().parent().next().delay(500).show('slide', {direction: 'right'}, 1000);
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