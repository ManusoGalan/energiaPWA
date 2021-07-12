<template>
  <div class="bg-yellow-300 h-full w-full absolute px-6 flex flex-col justify-center items-center">
    <p class="text-xl font-bold mb-6 md:text-3xl md:mb-10 xl:text-4xl xl:mb-12">¿Cuál {{ verbTense }} el precio de la luz el</p>
    <div class="flex mb-6 md:mb-10 xl:mb-12">
      <button v-on:click="subDay">
        <ChevronLeftIcon class="h-8 w-8" />
      </button>
      <DateSelector v-bind:date="date.getTime()" />
      <button v-on:click="addDay">
        <ChevronRightIcon class="h-8 w-8" />
      </button>
    </div>
    <p class="text-xl font-bold mb-6 md:text-3xl md:mb-10 xl:text-4xl xl:mb-12">a las</p>
    <div class="clock-container relative max-w-full mb-20">
      <button v-on:click="addHour"></button>
      <HourSelector v-bind:hour="date.getHours()" />
      <button v-on:click="subHour"></button>
    </div>
    <NuxtLink v-bind:to="`/${ date.getTime() }`">
      <div class="shadow-md rounded-full bg-white p-4">
        <ChevronRightIcon class="h-6 w-6"/>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      date: new Date(),
      verbTense: 'es'
    };
  },

  updated: function(){
    const currentDayOnlyHours = new Date().setMinutes(0, 0, 0)
    const selectedDayOnlyHours = this.date.setMinutes(0, 0, 0)
    if ( currentDayOnlyHours === selectedDayOnlyHours ) {
      this.verbTense = 'es'
    } else if ( currentDayOnlyHours > selectedDayOnlyHours ) {
      this.verbTense = 'fue'
    } else {
      this.verbTense = 'será'
    }
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
.clock-container > button {
  position: absolute;
  width: 0;
  height: 0;
  background: transparent;
  left: 23.5%;
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
