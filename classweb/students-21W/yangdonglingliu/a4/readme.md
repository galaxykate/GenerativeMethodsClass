Welcome to Lively Painting!

My idea is to still make it a drawing canvas for abstract art but everything will be lively. 

The layout (html + css) is adapted from Prof. Kate Compton's example page. with some tweaks in colors and buttons. The scripts for particles are also adapted from Prof. Kate's example code, as described in more detail below.

**Description of particles**

    1. bubbles
    Similar to snow particles that read wind forces from a map. Instead of experiencing gravity, it experience a buoyant force upwards. The color can be picked from a color picker with some random variation. The wind strength and buoyant strength can be adjusted using the sliders.

    2. curves
    Similar to the spring system but every point is constructing a bezier curve with the previous three points in the array. Border force is turned off so the points can spread out, and they wrap around the screen. The color can be picked from a color picker with some random variation. The wiggle force can be adjusted using the slider.

    3. fiery/oceanic boids
    Attribute "Type" is added to the boid system to make two distinct flocks with different cohesion, separation, alignment and self propulsion values. The cohesion and self propulsion (wandering) can be adjusted using the sliders, with the ranges set differently for the two types. Fiery boids are very intimate to each other whereas oceanic boids are casual and chill.

**Future plans**

I wanted to add some interactions between the two boid flocks but wasn't sure about the best way to do it. Maybe it would involve adding subclasses of Boid/BoidFlock?