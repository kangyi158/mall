<template>
  <div class="Detail">
    <DetailNavBar></DetailNavBar>

    <div>{{ iid }}</div>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
  },
  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.params.id;
  },
};
</script>

<style>
</style>