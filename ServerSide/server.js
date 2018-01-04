
// For NOT Richard .env: DATABASE_URL=postgres://@localhost:5432/pokeflip

require('dotenv').config();
const express = require('express');
const app = express();
const pg = require('pg');
const body = require('body-parser');
const cors = require('cors');
const superagent = require('superagent');
const pokeUrl = 'http://pokeapi.co/api/v2/pokemon/';
const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

const PORT = process.env.PORT;
console.log(PORT);
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();

app.use(cors());
app.use(body.json());
app.use(body.urlencoded({extended: true}));

loadPokemonTable();

app.get('/pokemon/match', (req, res) => {
    const match = req.query;
    client.query(`
        SELECT * FROM (
        SELECT * FROM pokemon WHERE 
        ((type_1 = $1 OR type_1 = $2 OR type_1 = $3 OR type_1 = $4 OR type_1 = $5) OR
        (type_2 = $1 OR type_2 = $2 OR type_2 = $3 OR type_2 = $4 OR type_2 = $5))
        INTERSECT
        SELECT * FROM pokemon WHERE 
        (color = $6 OR color = $7 OR color = $8)
        INTERSECT
        SELECT * FROM pokemon WHERE 
        (growth = $9 OR growth = $10)
        INTERSECT
        SELECT * FROM pokemon WHERE
        (shape = $11 OR shape = $12 OR shape = $13)
        ) t
        order by
        CASE
            WHEN gender BETWEEN -1 AND -1 THEN $14 
            WHEN gender BETWEEN 0 AND 3 THEN $15
            WHEN gender BETWEEN 4 AND 6 THEN $16
            WHEN gender BETWEEN 7 AND 8 THEN $17
        END LIMIT 1`, [match.type[0], match.type[1], match.type[2], match.type[3], match.type[4], match.color[0], match.color[1], match.color[2], match.growth[0], match.growth[1], match.shape[0], match.shape[1], match.shape[2], match.gender[0], match.gender[1], match.gender[2], match.gender[3]]
    )
        .then(types => {
            if (types.rows.length < 1) {
                res.send([
                    {
                        dex_number: 0,
                        name: 'missingNo',
                        img_url: '/../images/missingno.png',
                        type_1: 'bird',
                        type_2: 'normal',
                        color: 'gray',
                        dex_entry: 'This is a newly discovered Pokemon. It is currently under investigation. No detailed information is available at this time.',
                        growth: 'slow',
                        shape: 'armor',
                        gender: 'unknown'
                    }
                ]);
            } else {
                res.send(types.rows);
            }})   
        .catch(console.error);
});

app.get('/pokemon/:dex', (req, res) => {
    const dex = req.params.dex;
    superagent
        .get(`${pokeUrl}${dex}/`)
        .then((resp) => {
            const poke = resp.body;
            const pokeObj = {
                name: poke.name || 'n/a',
                dex_number: poke.id,
                img_url: poke.sprites.front_default || 'n/a',
                type_1: poke.types[1] ? poke.types[1].type.name : poke.types[0].type.name,
                type_2: poke.types[1] ? poke.types[0].type.name : null
            };
            insertPokemon(pokeObj);
            res.send('done');
        })
        .catch(console.error);
});

app.get('/pokemonspecies/:dex', (req, res) => {
    const dex = req.params.dex;
    superagent
        .get(`${speciesUrl}${dex}/`)
        .then((resp) => {
            const poke = resp.body;
            const allEntries = poke.flavor_text_entries;
            const pokeObj = {
                name: poke.name,
                color: poke.color.name || null,
                dex_entry: findEnglishDexEntry(allEntries), //looks for english entry
                growth: poke.growth_rate.name || null,
                shape: poke.shape.name || null,
                egg_group1: poke.egg_groups[1] ? poke.egg_groups[1].name : poke.egg_groups[0].name, //if there is a second type in the array, it is the main type
                egg_group2: poke.egg_groups[1] ? poke.egg_groups[0].name : null,
                gender: poke.gender_rate,
                dex_number: dex
            };
            updatePokemon(pokeObj);
            res.send('done');
        })
        .catch(console.error);
});

app.get('/*', (req, res) => {
    res.status('404').send('Not found!');
});


app.listen(PORT, () => (console.log(`listening for api requests to ${PORT}`)));


//////// ** FUNCTIONS ** ////////
////////////////////////////////////////

function findEnglishDexEntry(allEntries) {
    let engEntry;
    for (let i = (allEntries.length - 1); i > 0; i--) {
        if (allEntries[i].language.name == 'en') { //if the name of that entry is english
            engEntry = allEntries[i].flavor_text; //set it and return it
            break;
        }
    }
    return engEntry;
}

function insertPokemon(poke) {
    console.log(poke);
    client.query(
        'INSERT INTO pokemon (name, dex_number, img_url, type_1, type_2) VALUES ($1, $2, $3, $4, $5)',
        [poke.name, poke.dex_number, poke.img_url, poke.type_1, poke.type_2])
        .catch(console.error);
}

function updatePokemon(poke) {
    console.log(poke);
    client.query(
        'UPDATE pokemon SET color=$1, dex_entry=$2, growth=$3, shape=$4, egg_group1=$5, egg_group2=$6, gender=$8 WHERE dex_number=$7', 
        [poke.color, poke.dex_entry, poke.growth, poke.shape, poke.egg_group1, poke.egg_group2, poke.dex_number, poke.gender])
        .catch(console.error);
}

function loadPokemonTable() {
    client.query(
        'CREATE TABLE IF NOT EXISTS pokemon (dex_number INTEGER UNIQUE PRIMARY KEY, name VARCHAR(25), img_url VARCHAR(300), type_1 VARCHAR(25), type_2 VARCHAR(25), color VARCHAR(25), dex_entry VARCHAR(500), growth VARCHAR(25), shape VARCHAR(25), egg_group1 VARCHAR(25), egg_group2 VARCHAR(25));'
    )
        .catch(console.error);
}