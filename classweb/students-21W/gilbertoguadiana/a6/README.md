# Gilberto Guadiana
This page showcases a thought experiment on chasing money or community as long-term sustainable strategies. The intention was to argue that chasing community is a better long-term strategy than chasing money. Overall, I liked the results of the simulations as there was interesting emergent behavior to watch.

## Simulation 1 - Chasing money
### Characters
1. Money Objects - 💰
2. Empty Squares - □
3. Ambitious Person - 🕴
4. Ecstatic Person - 🕺

### Rules
1. If you are an ambitious person 🕴
  1. If you are next to a money object 💰, 25% become ecstatic people 🕺, 30% become empty squares □
  2. Otherwise, 30% become empty squares □
2. If you are an empty square □:
  1. If you are next to an ecstatic person, 50% chance of becoming an ecstatic person
  2. If you are next to an ambitious person, 25% chance of becoming an ambitious person
  3. Otherwise, 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
3. If you are an ecstatic person 🕺, 10% become ambitious people 🕴, 55% become empty squares □
4. If you are a money object 💰, do nothing.

## Simulation 2 - Chasing community
### Characters
1. Empty Squares - □
2. Ambitious Person - 🕴
3. Ecstatic Person - 🕺

### Rules
1. If you are an ambitious person 🕴:
  1. If you are next to an ambitious person 🕴, 15% become empty squares □, 25% become ecstatic people 🕺
  2. Otherwise, 30% become empty squares □
2. If you are an empty square □:
  1. If you are next to an ecstatic person, 50% chance of becoming an ecstatic person
  2. If you are next to an ambitious person, 25% chance of becoming an ambitious person
  3. Otherwise, 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
3. If you are an ecstatic person 🕺:
  1. If next to an ecstatic person 🕺, 15% become empty squares □, 5% become ambitious people 🕴
  2. Otherwise, 10% become ambitious people 🕴, 55% become empty squares □

## Simulation 3 - Chasing money and community
### Characters
1. Money Objects - 💰
2. Empty Squares - □
3. Ambitious Person - 🕴
4. Ecstatic Person - 🕺

### Rules
1. If you are an ambitious person 🕴
  1. If you are next to a money object 💰, 25% become ecstatic people 🕺, 30% become empty squares □
  2. If you are next to an ambitious person 🕴, 15% become empty squares □, 25% become ecstatic people 🕺
  3. Otherwise, 30% become empty squares □
2. If you are an empty square □:
  1. If you are next to an ecstatic person, 50% chance of becoming an ecstatic person
  2. If you are next to an ambitious person, 25% chance of becoming an ambitious person
  3. Otherwise, 15% chance of becoming an ambitious person 🕴, 5% chance of becoming an ecstatic person 🕺
3. If you are an ecstatic person 🕺:
  1. If next to an ecstatic person 🕺, 15% become empty squares □, 5% become ambitious people 🕴
  2. Otherwise, 10% become ambitious people 🕴, 55% become empty squares □
4. If you are a money object 💰, do nothing.

## Thank You's
I appreciated Kevin Simler's approach of building an argument using interactive simulations by slowly adding more complexity and abstraction at each step.

## References:
1. https://meltingasphalt.com/interactive/going-critical/
2. https://ncase.me/sim/

## Credits
1. Starter code was used from Prof. Kate Compton's CS 396: Generative Methods A6 assignment.
