SELECT name FROM pokemon WHERE (type_1 = 'fire' OR type_1 = 'electric' OR type_1 = 'dragon' OR type_1 = 'fighting' OR type_1 = 'fairy') OR (type_2 = 'fire' OR type_2 = 'dragon' OR type_2 = 'fighting' OR type_2 = 'fairy')
INTERSECT
SELECT name FROM pokemon WHERE (color = 'red' OR color = 'yellow' OR color = 'pink')
INTERSECT
SELECT name FROM pokemon WHERE ((egg_group1 = 'dragon' OR egg_group1 = 'humanshape' OR egg_group1 = 'monster') OR (egg_group2 = 'dragon' OR egg_group2 = 'humanshape' OR egg_group2 = 'monster'))
INTERSECT
SELECT name FROM pokemon WHERE (growth = 'fast' OR growth='slow-then-fast');
INTERSECT name FROM pokemon WHERE 