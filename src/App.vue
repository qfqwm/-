<template>

    <div v-if="$route.meta.keepAlive">
      <sSidebar></sSidebar>
      <router-view></router-view>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- <div v-if="$route.meta.keep">
      <router-view></router-view>
      <foot></foot>
    </div> -->
  
    <div v-if="$route.meta.keea">
      <tSidebar></tSidebar>
      <router-view></router-view>
    </div>

    <div v-if="$route.meta.kee">
      <aSidebar></aSidebar>
      <router-view></router-view>
    </div>



</template>

<script>
import sSidebar from "./components/sSidebar.vue";
import foot from "./components/foot.vue";
import tSidebar from "./components/tSidebar.vue";
import aSidebar from "./components/aSidebar.vue";

// alert(s)
// alert(typeof(s))

export default {
  mounted() {
    let d = localStorage.getItem("roule");
    this.roule = d;
    // localStorage.removeItem('roule')
  },

  data() {
    return {
      a: 20,
      roule: "",
    };
  },
  components: {
    sSidebar,
    foot,
    tSidebar,
    aSidebar
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>
