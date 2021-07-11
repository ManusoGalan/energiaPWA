<template>
    <div>
    {{ localizer.format(prevDay) }}
    {{ localizer.format(currentDay) }}
    {{ localizer.format(nextDay) }}
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            prevDay: new Date(),
            currentDay: new Date(),
            nextDay: new Date(),
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
            this.prevDay = new Date(this.date - 24 * 60 * 60 * 1000 )
            this.currentDay = new Date(this.date)
            this.nextDay = new Date(this.date + 24 * 60 * 60 * 1000 )
        }
    }
}
</script>