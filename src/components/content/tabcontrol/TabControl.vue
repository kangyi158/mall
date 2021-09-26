<template>
  <div class="tabcontrol">
    <div
      v-for="(item, index) in title"
      :key="index"
      @click="handleclick(index)"
      :class="{ active: index === cindex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    handleclick(index) {
      this.cindex = index;
    },
  },
  data() {
    return {
      cindex: 0,
    };
  },
};
</script>

<style>
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
.tabcontrol {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: white;
  font-size: 15px;
}
.tabcontrol div {
  flex: 1;
}
.tabcontrol div span {
  padding: 5px;
}
</style>