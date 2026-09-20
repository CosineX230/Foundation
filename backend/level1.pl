material(fire).
material(water).
material(plant).
material(stone).

material(blade).

concept(science).
concept(technology).
concept(life).

combine(technology, stone) :- material(blade).
combine(technology, fire) :- material(torch).
