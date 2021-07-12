<template>
  <div v-if="!$fetchState.pending" class="bg-yellow-300 h-full w-full absolute px-6 flex flex-col justify-center items-center">
    <NuxtLink class="absolute top-4 left-4" to='/'><ChevronLeftIcon class="h-10 w-10" /></NuxtLink>
    <div class="flex flex-col">
      <div class="flex items-center py-6">
        <p class="w-1/2 mr-4 font-bold">Una hora antes, el precio fue <span class="underline">{{ hours[0].price > hours[1].price ? 'más alto' : 'más bajo' }}</span></p>
        <div class="card shadow w-1/2 h-32 bg-white rounded ml-4 flex justify-center items-center">
          <span class="font-bold">{{hours[0].price}}</span>
        </div>
      </div>
      <div class="card shadow w-full h-32 rounded bg-white flex justify-center items-center">
        <span class="font-bold">{{hours[1].price}}</span>
      </div>
      <div class="flex items-center py-6">
        <div class="card w-1/2 h-32 bg-white shadow rounded mr-4 flex justify-center items-center">
          <span class="font-bold">{{hours[2].price}}</span>
        </div>
        <p class="w-1/2 ml-4 font-bold">Una hora después, el precio será <span class="underline">{{ hours[2].price > hours[1].price ? 'más alto' : 'más bajo' }}</span></p>
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
export default {
  data() {
    return {
      hours: []
    };
  },

  async fetch() {
    const _dateAsNumber = parseInt(this.$route.params.date);
    
    const hoursToSearch =  new Array (
      getPreviousHour(_dateAsNumber),
      _dateAsNumber,
      getNextHour(_dateAsNumber)
    );

    const fetchPromises = hoursToSearch.map((hour) => {
      return fetch(
        `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real
        ?start_date=${new Date(hour).toISOString()}
        &end_date=${new Date(hour + 60 * 60 * 1000).toISOString()}
        &time_trunc=hour`.replace(/\s/g, "")
      )
    });

    const fetchPromisesResult = await Promise.all(fetchPromises);

    const promiseToJSON = fetchPromisesResult.map((promise) => {
      return promise.json();
    })

    const promiseToJSONResult = await Promise.all(promiseToJSON);

    this.hours = hoursToSearch.map((hour, index) => {
      return {
        hour: hour,
        price: (promiseToJSONResult[index].included[0].attributes.values[0].value / 1000).toFixed(5)
      }
    })
  }
};

const getPreviousHour = date => {
  return date - 60 * 60 * 1000;
};

const getNextHour = date => {
  return date + 60 * 60 * 1000;
};

</script>
