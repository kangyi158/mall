<template>
  <div class="Detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <Scroll class="content" ref="scroll"
      ><DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper1.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
    };
  },
  created() {
    this.iid = this.$route.params.id;

    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //获取顶部轮播图的数组
      this.topImages = data.itemInfo.topImages;
      //创建商品信息的对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //保存商品的详情信息
      this.detailInfo = data.detailInfo;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style>
.Detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  background-color: #fff;
  z-index: 10;
  position: relative;
}
.content {
  height: calc(100%-44px);
}
</style>