The layout (html + css) is adapted from Prof. Kate Compton's example page, with some tweaks in colors and buttons.

**Description of tools**

The first row of tools:
Colors can be picked from the color picker.

    1. pen
    A regular pen tool for drawing lines. The stroke weight is set up so that the line is thicker when drawing slowly and thiner when drawing fast.

    2. + symmetry
    A 4-fold symmetry is added to the pen tool to make an kaleidoscope effect.

Three kinds of "brushes" below as described by the names. The hue, saturation, and lightness are randomly generated "near" the values of the picked color by the color picker. In this way, the drawing is colorful but the colors share the same tone.

    3. bubbles
    For drawing a collection of randomly placed bubbles around.

    4. fluffy
    For drawing fluffy-looking spots. It made use of the pixel buffer.

    5. grass
    For drawing grass. It made use of bezier curves.

The second row of tools:

    6. clear and 7. clear (colored)
    The same as the canvas clearing tools in Prof. Kate Compton's example code.

    8. blur
    For an effect of diffusing the paint around like on water painting on real papars. Similar to "smudge" in Prof. Kate Compton's example but it smudges to all angles. It made use of the pixel buffer.


**Future Plans**

1. So far, I think some of my tools don't go well with each other, such as symmetry pattern + grass (??weird combination). I'd like to adjust my tool design so they match better. 
2. I want to make n-fold symmetry a toggle option for all the other drawing tools.
3. I'd like to add a slider for each tool so I can change the brush size.
