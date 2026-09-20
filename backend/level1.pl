material(fire).
material(water).
material(plant).
material(stone).
material(air).

tool(blade).
tool(wood).

concept(science).
concept(technology).
concept(life).

combine(fire, water) :- material(air).
combine(fire, plant) :- material(air).
combine(fire, stone) :- material(blade).
combine(fire, air) :- material(fire).
combine(fire, blade) :- material(blade).
combine(fire, wood) :- material(coal).

combine(water, fire) :- material(air).
combine(water, plant) :- material(tree).
combine(water, stone) :- material(stone).
combine(water, air) :- material(water).
combine(water, blade) :- material(stone).
combine(water, wood) :- material(wood).

combine(plant, fire) :- material(air).
combine(plant, water) :- material(tree).
combine(plant, stone) :- material(plant).
combine(plant, air) :- material(tree).
combine(plant, blade) :- material(wood).
combine(plant, wood) :- material(tree).

combine(stone, fire) :- material(blade).
combine(stone, water) :- material(stone).
combine(stone, plant) :- material(plant).
combine(stone, air) :- material()





combine(technology, stone) :- material(blade).
combine(technology, fire) :- material(torch).
combine()
