<template>
    <div class="display">
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
export default display = {
        zero: function () {
            this.lightsOut();
            $('.A, .B, .C, .D, .E, .F').show();
        },
        one: function () {
            this.lightsOut();
            $('.B, .C').show();
        },
        two: function () {
            this.lightsOut();
            $('.A, .B, .D, .E, .G').show();
        },
        three: function () {
            this.lightsOut();
            $('.A, .B, .C, .D, .G').show();
        },
        four: function () {
            this.lightsOut();
            $('.B, .C, .F, .G').show();
        },
        five: function () {
            this.lightsOut();
            $('.A, .C, .D, .F, .G').show();
        },
        six: function () {
            this.lightsOut();
            $('.A, .C, .D, .E, .F, .G').show();
        },
        seven: function () {
            this.lightsOut();
            $('.A, .B, .C').show();
        },
        eight: function () {
            this.lightsOut();
            $('.A, .B, .C, .D, .E, .F, .G').show();
        },
        nine: function () {
            this.lightsOut();
            $('.A, .B, .C, .D, .F, .G').show();
        },
        lightsOut: function () {
            $('.A, .B, .C, .D, .E, .G, .D, .F').hide();
        }
    };

    display.one();

    setTimeout(function () {
        display.two();
    }, 1000);

    setTimeout(function () {
        display.three();
    }, 2000);

    setTimeout(function () {
        display.four();
    }, 3000);

    setTimeout(function () {
        display.five();
    }, 4000);

    setTimeout(function () {
        display.six();
    }, 5000);

    setTimeout(function () {
        display.seven();
    }, 6000);

    setTimeout(function () {
        display.eight();
    }, 7000);

    setTimeout(function () {
        display.nine();
    }, 8000);

    setTimeout(function () {
        display.zero();
    }, 9000);
}
</script>

<style>
body {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.display {
  position: relative;
}

.segment {
  height: 100px;
  width: 25px;
  background-color: #990000;
  margin-top: 12.5px;
}

.segment::after {
  content: "";
  position: absolute;
  top: -25px;
  left: 0;
  width: 0; 
  height: 0; 
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-bottom: 12.5px solid #990000;
  border-top: 12.5px solid transparent;
}

.segment::before {
  content: "";
  position: absolute;
  bottom: -25px;
  left: 0;
  width: 0; 
  height: 0; 
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-bottom: 12.5px solid transparent;
  border-top: 12.5px solid #990000;
}

.A {
  position: absolute;
  top: -45px;
  left: 90px;
  transform: rotate(90deg);
}

.B {
  position: absolute;
  top: 20px;
  left: 160px;
}

.C {
  position: absolute;
  top: 150px;
  left: 160px;
}

.D {
  position: absolute;
  top: 215px;
  left: 90px;
  transform: rotate(90deg);
}

.E {
  position: absolute;
  top: 150px;
  left: 20px;
}

.F {
  position: absolute;
  top: 20px;
  left: 20px;
}

.G {
  position: absolute;
  top: 85px;
  left: 90px;
  transform: rotate(90deg);
}
</style>