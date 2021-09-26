<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <a :href="banners.link">
          <img :src="item.image" alt="" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
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
};
</script>

<style>
</style>