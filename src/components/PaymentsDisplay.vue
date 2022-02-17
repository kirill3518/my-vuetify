<template>
  <v-container>
    <v-row>
      <v-col>#</v-col>
      <v-col>Date</v-col>
      <v-col>Category</v-col>
      <v-col>Value</v-col>
      <v-col></v-col>
    </v-row>
    <v-row v-for="item in getFPV" :key="item.id">
      <v-col>{{ item.id }}</v-col>
      <v-col>{{ item.date }}</v-col>
      <v-col>{{ item.category }}</v-col>
      <v-col>{{ item.value }}</v-col>
      <v-col><v-btn @click="onShowContextMenu(item)">...</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["deletePayment"]),
    editItem(item) {
      const settings = {
        header: "1234",
        action: "editpaymentform",
      };
      this.$modal.show(item, settings);
    },
    deleteItem(id) {
      this.deletePayment({ num: 1, id: id });
    },
    onShowContextMenu(item) {
      const items = [
        {
          id: 1,
          text: "Редактировать",
          action: () => {
            this.editItem(item);
          },
        },
        {
          id: 2,
          text: "Удалить",
          action: () => {
            this.deleteItem(item.id);
          },
        },
      ];
      this.$context.show(items);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getPaymentsList2"]),
    getFPV() {
      return this.getPaymentsList2;
    },
  },
};
</script>