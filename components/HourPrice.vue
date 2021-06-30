<template>
    <ul>
        <li v-for="hour of hours">{{ hour.price }}</li>
    </ul>
</template>
<script>
    const getPreviousHour = (date) => {
        return date.getTime() - (60*60*1000)
    }

    const getNextHour = (date) => {
        return date.getTime() + (60*60*1000)
    }

    const dateOnlyHour = new Date(new Date().setMinutes(0,0,0))

    export default {
        data() {
            return {
                hours: [
                    {
                        id: 0,
                        hour: new Date(getPreviousHour(dateOnlyHour)).toISOString(),
                        price: 0
                    },
                    {
                        id: 1,
                        hour: dateOnlyHour.toISOString(),
                        price: 0
                    },
                    {
                        id: 2,
                        hour: new Date(getNextHour(dateOnlyHour)).toISOString(),
                        price: 0
                    }
                ]
            }
        },
        async fetch() {
            let promisesArray = [];

            this.hours.forEach(hour => {
                promisesArray.push(this.$axios.$get (
                    `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real
                    ?start_date=${hour.hour}
                    &end_date=${new Date(new Date(hour.hour).setMinutes(59)).toISOString()}
                    &time_trunc=hour`.replace(/\s/g, '')
                ))
            })

            const promiseResult = await Promise.all(promisesArray)

            this.hours.forEach(hour => {
                hour.price = promiseResult.find(
                    priceInfo => new Date(priceInfo.included[0].attributes.values[0].datetime).getTime() == new Date(hour.hour).getTime()
                ).included[0].attributes.values[0].value / 1000
            })


        }
    }
</script>
