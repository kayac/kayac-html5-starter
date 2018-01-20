<template lang="pug">
.root(v-on:click="changeSampleName") {{ sampleMessage }}
</template>

<style lang="scss" scoped>
@import 'config';
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'root',
  computed: {
    ...mapGetters([ 'sampleMessage' ])
  },
  methods: {
    ...mapActions([ 'changeSampleName' ])
  }
};
</script>
