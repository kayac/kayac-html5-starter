<template lang="pug">
.root {{ message }}
</template>

<style lang="scss" scoped>
@import 'config';
</style>

<script>
export default {
  name: 'root',
  data () {
    return {
      message: 'hello, world.'
    }
  }
};
</script>
