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
        this.gender = pokeBuilder.changePokeGender(obj.gender);
    }

    pokeBuilder.prototype.toHtml = function(selector) {
        const template = Handlebars.compile($(`${selector}`).text());
        return template(this);
    };

    module.pokeBuilder = pokeBuilder;

})(app);