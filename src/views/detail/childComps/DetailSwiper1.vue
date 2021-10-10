<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in topImages" :key="index" class="swp">
      <img :src="item" alt="" class="simg" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.swp {
  height: 300px;
  overflow: hidden;
}
.simg {
  height: 100%;
  width: 100%;
}
</style>