<template>
  <div id="page">
    <!-- Section view-->
    <section id="view">
      <!-- Display components -->
      <PublishComponent />
      <PostComponent />
    </section>
  </div>
</template>

<script>
// import components
import PublishComponent from "../components/PublishComponent.vue"
import PostComponent from "@/components/PostComponent.vue"
//import axios from "axios";
// @ is an alias to /src
export default {
  name: "MainPageView",
  components: { PublishComponent, PostComponent },
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

<style scoped lang="scss">

* {
  font-family: 'Lato', sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#page {
  margin-top: 25px;
  display: flex;
  justify-content: center;

  // Section View
  #view {
    width: 772px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    background-color: #FFD7D7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>