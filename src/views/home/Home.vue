<template>
  <div>
    <Navbar class="home-navbar"><div slot="center">购物街</div></Navbar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommondView :recommends="recommends"></RecommondView>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";

export default {
  name: "Home",
  components: {
    Navbar,
    HomeSwiper,
    RecommondView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },

  created() {
    // 请求多个数据
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(res);
    });
  },
};
</script>

<style>
.home-navbar {
  background-color: var(--color-tint);
  color: white;
}
</style>