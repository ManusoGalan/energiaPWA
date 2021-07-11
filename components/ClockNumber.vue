<template>
  <div class="number">
    <div class="segment A"></div>
    <div class="segment B"></div>
    <div class="segment C"></div>
    <div class="segment D"></div>
    <div class="segment E"></div>
    <div class="segment F"></div>
    <div class="segment G"></div>
  </div>
</template>

<script>
export default {
  props: {
    digit: {
      type: Number,
      default: 0
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.lightUpNumber(this.digit);
    });
  },
  watch: {
    digit: function(newVal, oldVal) {
      this.lightUpNumber(this.digit);
    }
  },

  methods: {
    lightUpNumber: function(number) {
      this.$el.children.forEach(
        currentElement => (currentElement.style.opacity = 0.15)
      );
      switch (number) {
        case 0:
          this.$el
            .querySelectorAll(".A, .B, .C, .D, .E, .F")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 1:
          this.$el
            .querySelectorAll(".B, .C")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 2:
          this.$el
            .querySelectorAll(".A, .B, .D, .E, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 3:
          this.$el
            .querySelectorAll(".A, .B, .C, .D, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 4:
          this.$el
            .querySelectorAll(".B, .C, .F, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 5:
          this.$el
            .querySelectorAll(".A, .C, .D, .F, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 6:
          this.$el
            .querySelectorAll(".A, .C, .D, .E, .F, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 7:
          this.$el
            .querySelectorAll(".A, .B, .C")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 8:
          this.$el
            .querySelectorAll(".A, .B, .C, .D, .E, .F, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        case 9:
          this.$el
            .querySelectorAll(".A, .B, .C, .D, .F, .G")
            .forEach(
              currentElement => (currentElement.style.opacity = 1)
            );
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style>
.number {
  position: relative;
  width: 165px;
  height: 285px;
}

.number + .number {
  margin-left: 30px;
}

.number + .two-points {
  margin: 0 30px;
  color: #cc2929;
  font-size: 128px;
}

.number > .segment {
  height: 100px;
  width: 25px;
  background-color: #cc2929;
  margin-top: 12.5px;
	opacity: 0.5;
}

.number > .segment::after {
  content: "";
  position: absolute;
  top: -24px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12.5px solid #cc2929;
  border-top: 12.5px solid transparent;
}

.number > .segment::before {
  content: "";
  position: absolute;
  bottom: -24px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 12.5px solid transparent;
  border-top: 12.5px solid #cc2929;
}

.number > .segment.A {
  position: absolute;
  top: -50px;
  left: 70px;
  transform: rotate(90deg);
}

.number > .segment.B {
  position: absolute;
  top: 15px;
  left: 140px;
}

.number > .segment.C {
  position: absolute;
  top: 145px;
  left: 140px;
}

.number > .segment.D {
  position: absolute;
  top: 210px;
  left: 70px;
  transform: rotate(90deg);
}

.number > .segment.E {
  position: absolute;
  top: 145px;
  left: 0;
}

.number > .segment.F {
  position: absolute;
  top: 15px;
  left: 0;
}

.number > .segment.G {
  position: absolute;
  top: 80px;
  left: 70px;
  transform: rotate(90deg);
}
</style>
