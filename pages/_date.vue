<template>
  <div>
    <ul>
      <li v-for="hour of hours" :key="hour.id">{{ hour.price }}</li>
    </ul>
    <NuxtLink to='/'>Home</NuxtLink>
  </div>
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

    hoursToSearch.map((hour, index) => {
      this.hours.push({
        id: index,
        hour: hour,
        price: (promiseToJSONResult[index].included[0].attributes.values[0].value / 1000).toFixed(5)
      })
    })
  },

  fetchOnServer: false
};

const getPreviousHour = date => {
  return date - 60 * 60 * 1000;
};

const getNextHour = date => {
  return date + 60 * 60 * 1000;
};

</script>
