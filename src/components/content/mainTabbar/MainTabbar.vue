<template>
  <Tabbar>
    <TabbarItem path="/home">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item_icon" />
      <img
        src="~assets/img/tabbar/home_active.svg"
        alt=""
        slot="item_icon_active"
      />
      <div slot="item_text">首页</div>
    </TabbarItem>
    <TabbarItem path="/categary">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="item_icon" />
      <img
        src="~assets/img/tabbar/category_active.svg"
        alt=""
        slot="item_icon_active"
      />
      <div slot="item_text">分类</div></TabbarItem
    >
    <TabbarItem path="/shopcart">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="item_icon" />
      <img
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
        slot="item_icon_active"
      />
      <div slot="item_text">购物车</div></TabbarItem
    >
    <TabbarItem path="/profile">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="item_icon" />
      <img
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
        slot="item_icon_active"
      />
      <div slot="item_text">我的</div></TabbarItem
    >
  </Tabbar>
</template>

<script>
import Tabbar from "components/common/tabBar/Tabbar.vue";
import TabbarItem from "components/common/tabBar/TabbarItem.vue";
export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>