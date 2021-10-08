<template>
  <div id="home">
    <Navbar class="home-navbar"><div slot="center">购物街</div></Navbar>
    <TabControl
      :title="title"
      @tabClick="tabClick"
      ref="tabOffsetTop1"
      class="tabcontrol1"
      v-show="isTabControl"
    ></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="ConentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper
        :banners="banners"
        @SwiperImgLoad="SwiperImgLoad"
      ></HomeSwiper>
      <RecommondView :recommends="recommends"></RecommondView>
      <FeatureView></FeatureView>
      <TabControl
        :title="title"
        @tabClick="tabClick"
        ref="tabOffsetTop2"
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
import { debounce } from "common/utils";
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
      tapOffsetTop: 0,
      isTabControl: false,
      saveY: 0,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //refresh防抖，图片加载的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImgLoad", refresh);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 10);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getSCrollY();
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
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
      this.$refs.tabOffsetTop1.cindex = index;
      this.$refs.tabOffsetTop2.cindex = index;
    },
    // 点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 回顶部的按钮的出现与否
    ConentScroll(position) {
      // 决定BackTop是否显示
      this.showBackTop = -position.y > 800;
      //决定TabControl是否吸顶(positon:fixed)
      // this.isTabControl = -position.y > this.tapOffsetTop;
      this.isTabControl = -position.y >= 663;
    },
    //上拉加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },

    //防抖
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(args);
        }, delay);
      };
    },

    //TabControl的吸顶效果
    SwiperImgLoad() {
      // 获取TabControl的offsetTop
      this.tapOffsetTop = this.$refs.tabOffsetTop2.$el.offsetTop;
      console.log(this.tapOffsetTop);
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
  height: 100vh;
}
.home-navbar {
  background-color: var(--color-tint);
  color: white;
}

.content {
  height: calc(100%-83px);
  overflow: hidden;
}
.tabcontrol1 {
  position: fixed;
  left: 0;
  right: 0;
  top: 43px;
  z-index: 9;
}
</style>