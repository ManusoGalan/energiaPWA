<template>
    <span id="date-selector" class="text-center font-bold underline text-3xl md:text-4xl">{{ localizer.format(date) }}</span>
</template>

<script>
export default {
    data: function() {
        return {
            localizer: new Intl.DateTimeFormat('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })
        }
    },

    props: {
        date: {
            type: Number,
            default: 0
        }
    },

    watch: {
        date: function() {
            this.currentDay = new Date(this.date)
        }
    }
}
</script>

<style>
    #date-selector {
        width: 175px;
        display: inline-block
    }

    @media (min-width: 768px) {
        #date-selector {
            width: 250px;
        }
    }
</style>