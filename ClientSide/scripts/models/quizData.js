'use strict';

app = app || {};

(function(module) {
    const quizData = {};
    

    quizData.getMatch = (matchData, cb) => {
        console.log(matchData);
        $.get(`${API_URL}/pokemon/match`, matchData)
            .then((result) => {
                app.pokeBuilder.buildPoke(result);
                app.quizView.displayResults();
            })
            .then(cb());
    };

    module.quizData = quizData;

})(app);