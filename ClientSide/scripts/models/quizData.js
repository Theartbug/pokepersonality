'use strict';

app = app || {};

(function(module) {
    const quizData = {};
    

    quizData.getMatch = (matchData) => {
        $.get(`${API_URL}/pokemon/match`, matchData)
            .then((result) => {

        })
    }

    module.quizData = quizData;

})(app);