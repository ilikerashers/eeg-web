<template>
  <GraphPage msg="Lets get your focus back!"/>
</template>

<script>
import GraphPage from './components/GraphPage.vue'

export default {
  name: 'App',
  components: {
    GraphPage,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
