<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <a :href="banners.link">
          <img :src="item.image" alt="" @load="imagLoad" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isload: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      defult() {
        return [];
      },
    },
  },
  methods: {
    imagLoad() {
      if (!this.isload) {
        this.$emit("SwiperImgLoad");
        this.isload = true;
      }
    },
  },
};
</script>

<style>
</style>