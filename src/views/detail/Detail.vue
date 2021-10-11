<template>
  <div class="Detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <Scroll class="content" ref="scl"
      ><DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <GoodsList></GoodsList>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper1.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";

import GoodsList from "components/content/goods/GoodsList.vue";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    };
  },
  created() {
    this.iid = this.$route.params.id;

    // 请求详情数据
    getDetail(this.iid).then((res) => {
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

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scl.refresh();
    },
  },
};
</script>

<style scoped>
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