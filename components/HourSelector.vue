<template>
  <div id="display-container">
    <div id="display">
      <ClockNumber :digit="hourHigh" />
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
    },
    $route: function(to, from) {
      calcScale();
    }
  },

  mounted: function() {
    this.hourHigh = parseInt(this.hour / 10);
    this.hourLow = this.hour % 10;

    this.$nextTick(function() {
      document.getElementById("display").style.transform = "scale(0.5)";
      window.addEventListener("resize", calcScale);
      calcScale();
    });
  },

  destroyed: function() {
    window.removeEventListener("resize", calcScale);
  }
};

const calcScale = () => {
  console.log("Calculating scale");
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

  document.getElementById("display").style.transform = `scale(${
    newScale > 0.5 ? 0.5 : newScale
  })`;

  document.getElementById(
    "display-container"
  ).style.height = `${document.getElementById("display").getBoundingClientRect()
    .height + 100}px`;
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
