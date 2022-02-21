<template>
  <div class="wrp">
    <div @click="onClick(cur - 1)">-</div>
    <div
      v-for="item in amount"
      :key="item"
      :class="{ active: cur === item }"
      @click="onClick(item)"
    >
      {{ item }}
    </div>
    <div @click="onClick(cur + 1)">+</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"; // добавил

export default {
  name: "Pagination",
  props: {
    // length: Number,
    cur: Number,
    n: Number,
  },
  computed: {
    ...mapGetters(["getPaymentsList"]), // добавил
    ...mapMutations(["setPageList"]), // добавил
    amount() {
      //   return Math.ceil(this.length / this.n);
      return Math.ceil(this.getPaymentsList / this.n);
    },
  },
  methods: {
    onClick(page) {
      this.cur = this.setPageList();
      if (page < 1 || page > this.amount || page === this.cur) {
        return;
      }
      this.$emit("paginate", page);
    },
  },
};
</script>

<style scoped lang="scss">
.wrp {
  display: flex;
  & > div {
    padding: 10px;
    &.active {
      background: #ccc;
    }
  }
}
</style>