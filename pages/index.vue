<template>
  <div>
    <p>¿Cuál fue el precio de la luz el</p>
    <button v-on:click="addDay">
      Add day
    </button>
    <DateSelector v-bind:date="date.getTime()" />
    <button v-on:click="subDay">
      Sub day
    </button>
    <p>a las</p>
    <div class="clock-container">
      <button v-on:click="addHour"></button>
      <HourSelector v-bind:hour="date.getHours()" />
      <button v-on:click="subHour"></button>
    </div>
    <NuxtLink v-bind:to="`/${ date.getTime() }`">Consultar hora</NuxtLink>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      date: new Date()
    };
  },

  methods: {
    addDay: function() {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    },

    subDay: function() {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    },

    addHour: function() {
      this.date = new Date(
        this.date.getHours() === 23
          ? this.date.setHours(0)
          : this.date.setHours(this.date.getHours() + 1)
      );
    },
    subHour: function() {
      this.date = new Date(
        this.date.getHours() === 0
          ? this.date.setHours(23)
          : this.date.setHours(this.date.getHours() - 1)
      );
    }
  }
};
</script>

<style>
.clock-container {
  position: relative;
  max-width: 650px;
}

.clock-container > button {
  position: absolute;
  width: 0;
  height: 0;
  background: transparent;
  left: 17.5%;
  padding: 0;
}

.clock-container > button:first-child {
  top: 10px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 24px solid #cc2929;
  border-top: 0;
}

.clock-container > button:last-child {
  bottom: 10px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 24px solid #cc2929;
  border-bottom: 0;
}
</style>
