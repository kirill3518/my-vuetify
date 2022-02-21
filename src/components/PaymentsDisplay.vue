<template>
  <v-container>
    <v-row>
      <v-col :cols="1">#</v-col>
      <v-col :cols="3">Date</v-col>
      <v-col :cols="3">Category</v-col>
      <v-col :cols="2">Value</v-col>
      <v-col :cols="0"></v-col>
    </v-row>
    <v-row v-for="item in getFPV" :key="item.id">
      <v-col :cols="1">{{ item.id }}</v-col>
      <v-col :cols="3">{{ item.date }}</v-col>
      <v-col :cols="3">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col :cols="0"
        ><v-btn @click="onShowContextMenu(item)">...</v-btn></v-col
      >
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
    ...mapGetters(["getPaymentsList"]),
    getFPV() {
      return this.getPaymentsList;
    },
  },
};
</script>