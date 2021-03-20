**Note**
*If clicking the reroll button cause the patterns to disappear, simply hover over the canvas and click it again.*

**About**

My goal for this project is to use a small number of parameters and very little explicit design to generate patterns with large variations. To achieve that, I came up with this idea of using a collection of strokes, as "pixels", to construct patterns. 

On a polar coordinate, there are 48 angles (because 48 has a lot of factors: [1, 2, 3, 4, 6, 8, 12, 16, 24, 48], I can generate many centrosymmetric patterns) and 10 strokes along the radius at each angle. 
1. Every stroke has its own angle, relative to the main angle that dictates its location;
2. A stroke can be visible or invisible;
3. The length of each stroke can be varied.

The six sliders:
1. **cycle length** and **density**
<p>For example, in the sequence of 48 angles, there are 12 cycles of [visible, visible, visible, invisible] strokes. In this case, the **cycle length** is 4 and the **density** is the percentage of visible strokes: 3/4.<p>

2. **angle cycle length**, **angle min**, and **angle max**
<p>For example, in the sequence of 48 angles, the stroke angles, relative to the main angle, follow the pattern of 8 cycles of [0, pi/5, 2\*pi/5, 3\*pi/5, 4\*pi/5, pi]. In this case, the **angle cycle length** is 6, the **angle min** is 0, and the **angle max** is pi. After determining **angle cycle length** and the angle range (**angle min** and **angle max**), the strokes angles are linearly spaced within the range.<p>

3. **stroke length**
<p>This one is straightforward – the length of each stroke. It can create interesting patterns when strokes cross each other.<p>

Note that the sliders are set to take values of 0, 1, 2, ..., 9. They are converted to proper ranges for the parameters above. 

**Future work**:
So far, the variations come from the angular direction, not much from the radial direction. One parameter that would be interesting to add is the "offset" along the radius. By setting different offsets from inner circles outwards, I can imagine it would generate some cool spiral patterns. But I think the current centrosymmetric patterns have their own merits, so I'll save the offset for next version.

Another variation is to have varying lengths for strokes, instead of one length for all the strokes. And of course, we can always change the color. For now, I'm keeping it simple since it already looks a bit complex.

**Acknowledgement**:
The framework of the code and the functions are from Prof. Kate Compton's example code.
