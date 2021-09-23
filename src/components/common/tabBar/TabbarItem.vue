<template>
  <div class="tabbar_item" @click="itemClick">
    <div v-if="!isActive"><slot name="item_icon"></slot></div>
    <div v-else><slot name="item_icon_active"></slot></div>
    <div :class="{ active: isActive }"><slot name="item_text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  props: {
    path: String,
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style >
.tabbar_item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbar_item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 2px;
}
.active {
  color: #f34462;
}
</style>