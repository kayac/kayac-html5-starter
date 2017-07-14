<template lang="pug">
  .root {{ hello }}
</template>

<script>
  export default {
      name: 'root',
      data () {
          return {
              hello: 'world'
          }
      }
  }
</script>
