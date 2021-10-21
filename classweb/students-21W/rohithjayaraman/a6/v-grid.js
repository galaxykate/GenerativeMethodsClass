Vue.component("grid-p5", {
  template: '<div class="p5-grid"></div>',
  mounted() {
    console.log("mounted p5");
    let gridP5 = new p5((p) => {
      p.setup = () => {
        let w = this.size * this.sim.w;
        let h = this.size * this.sim.h;
        p.createCanvas(w, h);
        p.colorMode(p.HSL);
        if (this.sim.mode == "resilience") {
          this.resilienceSlider = p.createSlider(10, 100, 40, 10);
        }
        if (this.sim.mode == "group") {
          this.groupSlider = p.createSlider(2, 8, 4, 1);
        }
      };
      p.draw = () => {
        p.background("white");
        for (var i = 0; i < this.sim.h; i++) {
          for (var j = 0; j < this.sim.w; j++) {
            this.sim.drawCell(
              p,
              j,
              i,
              j * this.size,
              i * this.size,
              this.size,
              this.size,
              this.resilienceSlider ? this.resilienceSlider.value() : 50,
              this.groupSlider ? this.groupSlider.value() : 0
            );
          }
        }
      };

      p.mouseMoved = () => {
        if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
          let x = Math.floor(p.mouseX / this.size);
          let y = Math.floor(p.mouseY / this.size);

          this.sim.select(x, y);
        }
      };

      p.mouseClicked = () => {
        if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
          let x = Math.floor(p.mouseX / this.size);
          let y = Math.floor(p.mouseY / this.size);
          //console.log('here')
          this.sim.click(x, y);
        }
      };
    }, this.$el);
  },

  props: {
    sim: { required: true, type: Object },
    size: { default: 30, type: Number },
  },
});
