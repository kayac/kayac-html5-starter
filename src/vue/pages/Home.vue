<template lang="pug">
.home
    h1(@click="changeMsg") {{msg}}
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            msg: 'hello world!'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "common";
</style>
