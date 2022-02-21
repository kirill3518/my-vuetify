<template>
  <div class="context">
    <v-dialog v-model="dialog">
      <v-card
        class="context__item"
        v-for="item in items"
        v-bind:key="item.id"
        @click="onClickAction(item)"
      >
        {{ item.text }}
      </v-card>
      <v-btn @click="dialog = false">Close</v-btn>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      dialog: false,
      items: [],
    };
  },
  methods: {
    onClickAction(item) {
      item.action();
      this.dialog = false;
    },
    onShow(items) {
      this.items = items;
      this.dialog = true;
    },
  },
  mounted() {
    this.$context.EventBus.$on("show", this.onShow);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("show", this.onShow);
  },
};
</script>

