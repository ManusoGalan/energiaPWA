<template>
  <div class="transition-colors bg-yellow-300 absolute h-full w-full overflow-hidden">
    <transition appear v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
      <div v-if="!loadingHours && !hours.length" class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center px-6">
        <p class="text-xl font-bold mb-6 md:text-3xl md:mb-10 xl:text-4xl xl:mb-12">¿Cuál {{ verbTense }} el precio de la luz el</p>
        <div class="flex mb-6 md:mb-10 xl:mb-12">
          <button v-on:click="subDay">
            <ChevronLeftIcon class="h-8 w-8" />
          </button>
          <DateSelector :date="date.getTime()"/>
          <button v-on:click="addDay">
            <ChevronRightIcon class="h-8 w-8" />
          </button>
        </div>
        <p class="text-xl font-bold mb-6 md:text-3xl md:mb-10 xl:text-4xl xl:mb-12">a las</p>
        <div class="clock-container relative max-w-full mb-20">
          <button v-on:click="addHour"></button>
          <HourSelector :hour="date.getHours()" />
          <button v-on:click="subHour"></button>
        </div>
        <button @click="showPrices">
          <div class="shadow-md rounded-full bg-white p-4">
            <ChevronRightIcon class="h-6 w-6"/>
          </div>
        </button>
      </div>
    </transition>
    <div v-if="fetchErrors" class="fixed z-10 w-full h-full bg-gray-900 bg-opacity-30 flex justify-center items-center">
      <transition appear v-on:before-enter="showTopCardBefore" v-on:enter="showTopCard" v-bind:css="false">
        <div class="p-10 bg-gray-200 rounded-md m-auto max-w-xs md:max-w-md xl:max-w-xl text-center">
          <div class="flex text-left">
            <ExclamationIcon class="h-8 w-8 text-yellow-500 flex-shrink-0 mr-6"/>
            <div>
              <p class="text-xl font-bold text-yellow-500 mb-6">¡Vaya!</p>
              <p class="text-gray-500 text-sm mb-6">
                Parece que ha habido algún fallo al obtener los datos. Por favor, comprueba que estés conectado a Internet para poder recuperar los datos de la red o prueba una fecha más cercana, ya que la consultada podría no estar disponible.<br><br>
                También es posible que el servidor de Red Eléctrica Española esté caído. En tal caso, espera unos minutos para volver a realizar la consulta.
              </p>
            </div>
          </div>
          <button @click="fetchErrors = false" class="w-64 rounded-full bg-green-700 py-2">
            <CheckIcon class="h-8 w-8 text-white mx-auto"/>
          </button>
        </div>
      </transition>
    </div>
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
      <div v-if="loadingHours" class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center px-6">
        <p>Loading...</p>
      </div>
    </transition>
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
      <div v-if="!loadingHours && hours.length" class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center px-6">
        <button class="absolute top-4 left-4" @click="resetData"><ChevronLeftIcon class="h-10 w-10" /></button>
        <div class="flex flex-col justify-center h-full">
          <transition appear v-on:before-enter="showTopCardBefore" v-on:enter="showTopCard">
            <div class="flex items-center py-6">
              <p class="w-1/2 mr-4 font-bold">Una hora antes, el precio {{ hourBeforeTense }} <span class="underline">{{ hours[0].price > hours[1].price ? 'más alto' : 'más bajo' }}</span></p>
              <div class="card shadow w-1/2 h-32 bg-white rounded ml-4 flex justify-center items-center">
                <span class="font-bold">{{hours[0].price}}<br>€/kWh</span>
              </div>
            </div>
          </transition>
          <transition appear v-on:before-enter="popCardBefore" v-on:enter="popCard">
            <div class="card shadow w-full h-32 rounded bg-white flex flex-col justify-center items-center">
              <p class="mb-4 font-bold">El precio el {{ new Date(hours[1].hour).getDate() }}  de {{ new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date(hours[1].hour)) }} a la{{new Date(hours[1].hour).getHours() != 1 ?  's' : ''}} {{ new Date(hours[1].hour).getHours() < 10 ? '0' : ''}}{{ new Date(hours[1].hour).getHours() }}:00 {{verbTense}}</p>
              <span class="font-bold">{{hours[1].price}} €/kWh</span>
            </div>
          </transition>
          <transition appear v-on:before-enter="showBottomCardBefore" v-on:enter="showBottomCard">
            <div class="flex items-center py-6">
              <div class="card w-1/2 h-32 bg-white shadow rounded mr-4 flex justify-center items-center">
                <span class="font-bold">{{hours[2].price}}<br>€/kWh</span>
              </div>
              <p class="w-1/2 ml-4 font-bold">Una hora después, el precio {{ hourAfterTense }} <span class="underline">{{ hours[2].price > hours[1].price ? 'más alto' : 'más bajo' }}</span></p>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'

export default {
  data: function() {
    return {
      date: new Date(),
      hourBeforeTense: 'fue',
      verbTense: 'es',
      hourAfterTense: 'será',
      hours: [],
      loadingHours: false,
      fetchErrors: false
    };
  },

  updated: function(){
    const currentDayOnlyHours = new Date().setMinutes(0, 0, 0)
    const selectedDayOnlyHours = this.date.setMinutes(0, 0, 0)
    if ( currentDayOnlyHours === selectedDayOnlyHours ) {
      this.hourBeforeTense = 'fue';
      this.verbTense = 'es';
      this.hourAfterTense = 'será'
    } else if ( currentDayOnlyHours > selectedDayOnlyHours ) {
      this.hourBeforeTense = 'fue';
      this.verbTense = 'fue'
      if( currentDayOnlyHours == selectedDayOnlyHours + 60 * 60 * 1000){
        this.hourAfterTense = 'es';
      } else {
        this.hourAfterTense = 'fue'
      }
    } else {
      this.verbTense = 'será'
      this.hourAfterTense = 'será'
      if( currentDayOnlyHours == selectedDayOnlyHours - 60 * 60 * 1000){
        this.hourBeforeTense = 'es';
      } else {
        this.hourBeforeTense = 'será'
      }
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
    },
    showPrices: function() {
      this.loadingHours = true;

      const _dateAsNumber = parseInt(this.date.getTime());
    
      const hours = new Array (
        getPreviousHour(_dateAsNumber),
        _dateAsNumber,
        getNextHour(_dateAsNumber)
      );

      hours.map((hour) => {
        fetchPriceDate(hour).then(res => {
          if(res.errors != undefined && res.errors[0].code == 502){
            this.fetchErrors = true;
            this.loadingHours = false;
            return;
          } else {
            this.hours.push({
              'hour': hour,
              'price': (res.included[0].attributes.values[0].value / 1000).toFixed(5)
            })

            if(this.hours.length == hours.length) {
              this.hours = this.hours.sort((first, second) => {
                return first.hour - second.hour
              });

              if(this.hours[1].price < 0.10) {
                document.querySelector('.bg-yellow-300').classList.add('bg-green-600')
                document.querySelector('.bg-yellow-300').classList.remove('bg-yellow-300')
              } else if(this.hours[1].price > 0.15) {
                document.querySelector('.bg-yellow-300').classList.add('bg-red-500')
                document.querySelector('.bg-yellow-300').classList.remove('bg-yellow-300')
              }

              this.loadingHours = false;
            }
          }
        }).catch(() => {
          this.fetchErrors = true;
          this.loadingHours = false;
        })
      });
    },

    resetData: function() {
      this.hours = [];
      this.loadingHours = false;

      if(document.querySelector('.bg-green-600, .bg-red-500') != null) document.querySelector('.bg-green-600, .bg-red-500').classList.add('bg-yellow-300')
      if(document.querySelector('.bg-green-600') != null) document.querySelector('.bg-green-600').classList.remove('bg-green-600')
      if(document.querySelector('.bg-red-500') != null) document.querySelector('.bg-red-500').classList.remove('bg-red-500')
    },

    beforeEnter: function(el) {
      el.style.transform = 'translateX(100%)'
    },
    enter: function (el, done) {
      anime({
        targets: el,
        translateX: 0,
        complete: done
      })
    },
    leave: function (el, done) {
      anime({
        targets: el,
        translateX: -100,
        complete: done
      })
    },

    showTopCardBefore: function(el) {
      el.style.transform = 'translateY(-300%)'
    },
    showTopCard: function(el, done) {
      anime({
        targets: el,
        translateY: 0,
        delay: 700,
        complete: done
      })
    },

    showBottomCardBefore: function(el) {
      el.style.transform = 'translateY(300%)'
    },
    showBottomCard: function(el, done) {
      anime({
        targets: el,
        translateY: 0,
        delay: 700,
        complete: done
      })
    },

    popCardBefore: function(el) {
      el.style.transform = 'scale(0)'
    },
    popCard: function(el, done){
      anime({
        targets: el,
        scale: 1,
        delay: 200,
        complete: done
      })
    },
  }
};

const fetchPriceDate = async function(hour) {
  await new Promise((res, rej) => {setTimeout(res, 500)});

  const fetchPromise = await fetch(
    `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real
    ?start_date=${new Date(hour).toISOString()}
    &end_date=${new Date(hour + 60 * 60 * 1000).toISOString()}
    &time_trunc=hour`.replace(/\s/g, "")
  )

  return fetchPromise.json();
};

const getPreviousHour = date => {
  return date - 60 * 60 * 1000;
};

const getNextHour = date => {
  return date + 60 * 60 * 1000;
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
