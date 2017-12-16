<template lang="pug">
  .root {{ message }}
</template>

<script>
  export default {
      name: 'root',
      data () {
          return {
              message: 'hello, world.'
          }
      }
  }
</script>
