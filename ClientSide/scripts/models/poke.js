'use strict';

app = app || {};

(function(module) {

    function pokeBuilder(obj) {
        this.name = obj.name;
        this.img_url = obj.img_url;
        this.dex_number = obj.dex_number;
        this.type_1 = obj.type_1;
        this.type_2 = obj.type_2;
        this.shape = obj.shape;
        this.color = obj.color;
        this.dex_entry = obj.dex_entry;
        this.gender = app.quizControl.changePokeGender(obj.gender);
    }

    pokeBuilder.results = [];

    pokeBuilder.buildPoke = pokemon => { //If I ever want to display more than one pokemon
        pokeBuilder.results = pokemon.map(pokeObj => new pokeBuilder(pokeObj));
    };

    pokeBuilder.prototype.toHtml = function(selector) {
        const template = Handlebars.compile($(`${selector}`).text());
        return template(this);
    };

    module.pokeBuilder = pokeBuilder;

})(app);