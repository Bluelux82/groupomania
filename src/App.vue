<template>
  <!-- Display Header component and view-->
  <HeaderComponent />
  <router-view />
</template>

<script>
// Import header component
import HeaderComponent from "./components/HeaderComponent"
export default {
  components: {
    HeaderComponent
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
body{
  background-color: #4E5166;
}
body,
html,
#app {
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
