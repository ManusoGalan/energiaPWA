<template>
  <div id="display-container">
    <div id="display" style="transform: scale(.5)">
      <ClockNumber v-on:number-mounted="calcScale" :digit="hourHigh" />
      <ClockNumber :digit="hourLow" />
      <span class="two-points">:</span>
      <ClockNumber />
      <ClockNumber />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hour: {
      type: Number,
      default: 0
    }
  },

  data: () => {
    return {
      hourHigh: 0,
      hourLow: 0
    };
  },

  watch: {
    hour: function() {
      this.hourHigh = parseInt(this.hour / 10);
      this.hourLow = this.hour % 10;
    }
  },

  created: function() {
    window.addEventListener("resize", this.calcScale);
  },

  mounted: function() {
    this.hourHigh = parseInt(this.hour / 10);
    this.hourLow = this.hour % 10;
  },

  destroyed: function() {
    window.removeEventListener("resize", this.calcScale);
  },

  methods: {
    calcScale: function(e) {
      const containerWidth =
        document.getElementById("display-container").getBoundingClientRect().width -
        30;

      const containerScale = parseFloat(
        document
          .getElementById("display")
          .style.transform.split("(")[1]
          .split(")")[0]
      );

      const elementWidth = document
        .getElementById("display")
        .getBoundingClientRect().width;

      const newScale = containerWidth / (elementWidth / containerScale);

      document.querySelectorAll("#display").forEach(el => {
        el.style.transform = `scale(${
          newScale > 0.5 ? 0.5 : newScale
        })`;
      })

      document.querySelectorAll("#display-container").forEach(el => {
        el.style.height = 
          `${document.getElementById("display").getBoundingClientRect().height + 100}px`;
      })
    }
  }
};
</script>
<style>
body {
  overflow-x: hidden;
}

#display-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333333;
  border-radius: 20px;
  max-width: 490px;
}

#display {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: #4d0f0f;
  border-radius: 20px;
}
</style>
