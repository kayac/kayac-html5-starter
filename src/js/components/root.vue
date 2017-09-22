<template lang="pug">
  .root(v-on:click="changeSampleName") {{ sampleMessage }}
</template>

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
  }
</script>
