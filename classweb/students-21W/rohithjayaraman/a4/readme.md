# Assignment 4 - Particles

The aim of the assignment was to create a simple particle system using P5. It should have at least 3 unique particles, one of the particles should be reading from a map or use particle-to-particle interaction and there must be at least 3 sliders to modify the behaviour of the particles. There should also be a UI capability to click and add more particles of a given type.

I created a chaotic quidditch game as a particle system. It has 3 particles and the whole system works by reading a lightmap i.e. braitenberg vehicles

## Particle 1 - Snitches
Golden snitches are fast moving particles. Their movement is determined by 4 forces - <ol><li>Wing force which is randomly determined</li><li>Wiggle force (determined via a slider)</li> <li>Gravity</li><li>Drag</li></ol>Additionally,
- Each snitch writes to the green channel in the lightmap
- There is a debug button that will show the velocity vector, wiggle force, wing force and gravity for each snitch when clicked

## Particle 2 - Bludgers
Bludgers are huge balls that in the harry potter world, try to hurt seekers. The bludgers represent a braitenberg vehicle that senses a channel from the lightmap. In my world, their movement is determined by 3 forces - 
<ol><li>Braitenberg force which is calculated based on sensor values. The bludgers read from the blue channel of the lightmap (which represents seekers). The bludgers are constantly trying to move towards seekers.</li><li>Gravity</li><li>Drag (determined via a slider)</li></ol>Additionally,
<ul><li> Each bludger writes to the red channel in the lightmap</li>
<li>There is a debug button that will show the velocity vector, braitenberg force and gravity for each bludger when clicked</li></ul>

## Particle 3 - Seekers
Seekers are the ones playing the game of quidditch. They try to catch the snitch and avoid the bludgers. The seekers represent a braitenberg vehicle that senses 2 different channels. Their movement is determined by 4 forces
<ol>
  <li>Braitenberg force towards snitches which is calculated based on sensor values. The seekers read from the green channel of the lightmap (which represents snitches). The seekers are constantly trying to move towards snitches.</li>
  <li>Braitenberg force towards bludgers which is calculated based on sensor values. The seekers read from the red channel of the lightmap (which represents bludgers). The seekers are constantly trying to move away from bludgers.</li>
  <li>Gravity</li><li>Drag (determined via a slider)</li>
</ol>
Additionally,
<ul><li>Each seeker particle writes to the blue channel in the lightmap</li>
<li>There is a debug button that will show the velocity vector, force (sum of both braitenberg forces) and gravity for each seeker when clicked</li></ul>

## Extra features
- There is a lightmap on the top right of the screen which represents the source for the sensors. Green means snitches, red means bludgers and blue means seekers. 
- Aside from the sliders, there are buttons to add new snitches, bludgers and seekers to the canvas. After clicking any of the 'Create' buttons, you can click anywhere on the canvas to create a new particle of that type. There is also a text displaying what the current creation mode is.
- There is a pause button which pauses the canvas i.e. positions are not updated

## References
- [Braitenberg vehicles](https://www.usna.edu/Users/cs/crabbe/SI475/current/vehicles.pdf)
- [Prof. Kate's code](https://github.com/galaxykate/CS396-GenMeth-21W/tree/main/classweb/students/katecompton/a4)
- [Google fonts - Alegreya](https://fonts.google.com/specimen/Alegreya)


