'use strict';

app = app || {};

(function(module) {
    const quizView = {};

    quizView.initQuiz = () => {

    }

    quizView.changeQuestion = () => {
        $('input[type="radio"]').on('click', function() {
            app.quizData.combineSelections($(this).attr('name'), $(this).val().split(' '));
            if ($(this).parent().attr('id') === 'gender') {
                app.quizData.getMatch(app.quizControl.selections);
            }
            // $(this).parent().

        });
    }

    module.quizView = quizView;

})(app);