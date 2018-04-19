<template lang="pug">
.app
    CommonHeader
    Ranking
    CommonFooter
</template>


<script>
import Ranking from '@/vue/pages/Ranking.vue'
import CommonHeader from '@/vue/parts/CommonHeader.vue'
import CommonFooter from '@/vue/parts/CommonFooter.vue'

export default {
    name: "app",

    components: {
        Ranking,
        CommonHeader,
        CommonFooter,
    }
}
</script>


<style lang="scss" scoped>
</style>
