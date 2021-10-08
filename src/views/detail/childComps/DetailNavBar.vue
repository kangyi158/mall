<template>
  <div id="DetailNavBar">
    <NavBar>
      <div slot="left">
        <img
          src="~assets/img/common/back.svg"
          alt=""
          class="img"
          @click="backClick"
        />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in title"
          :key="index"
          class="titleItem"
          :class="{ active: index === currentIndex }"
          @click="handleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.img {
  margin-top: 10px;
}
</style>