<template>
  <div id="home">
    <Navbar class="home-navbar"><div slot="center">购物街</div></Navbar>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="ConentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommondView :recommends="recommends"></RecommondView>
      <FeatureView></FeatureView>
      <TabControl
        class="tab-control"
        :title="title"
        @tabClick="tabClick"
      ></TabControl>

      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="showBackTop"></BackTop>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommondView from "./childComps/RecommondView";
import FeatureView from "./childComps/Feature.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    Scroll,
    Navbar,
    HomeSwiper,
    RecommondView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      title: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop: false,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 回顶部的按钮的出现与否
    ConentScroll(position) {
      // console.log(position);
      this.showBackTop = -position.y > 800;
    },
    //上拉加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const tpage = this.goods[type].page + 1;
      getHomeGoods(type, tpage).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-navbar {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.content {
  height: calc(100%-83px);

  overflow: hidden;
}
</style>