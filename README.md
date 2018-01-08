# pokepersonality

### Objective

<img align="right" src="https://i.imgur.com/jgFl0Nl.png" width="70">

Create a Pokemon personality test utilizing postgresql statements that will filter out ~800 possible pokemon in database to a single result. Utilize jQuery, Express, handlebars.js, postgresql, html, and CSS.

### Steps taken

<img align="right" src="https://i.imgur.com/aC6OPhU.png" width="70">

- Create a series of questions/answers that will determine filtering options. 
- Create a database with all 802 (as of 2017) Pokemon with certain traits to use as filters.
- Create functions to seed pokemon into local database as pokeAPI is very slow at returning results.

<img align="right" src="https://i.imgur.com/tXW1Xx5.png" width="70">

- Have each answer correlate to multiple filtering options as the filters were too strong for a database with only 802 pokemon.
- Create a giant postgresql statement that will filter for pokemon based on the options selected. Limit results to one pokemon. If no pokemon was returned from search, send a missingno as result.
- Style as mobile first.

### Results & Future Changes

The application was successful. One of the most challenging parts was learning how to create a postgresql statement that would filter out so many options. I ended up using multiple INTERSECT statements. Another challenge was figuring out how to copy a local database over to heroku, which was accomplished using pg:push.

<img align="right" src="https://i.imgur.com/UB3KGS6.png" width="100">

Future changes would include styling for desktop, creating an about page, and saving your results.
