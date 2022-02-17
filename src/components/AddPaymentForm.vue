<template>
  <div class="AddPaymentForm">
    <v-dialog v-model="dialog">
      <v-card>
        <v-text-field v-model="date" label="Date"></v-text-field>
        <v-select
          v-model="category"
          label="Category"
          :items="getCats"
        ></v-select>
        <v-text-field v-model.number="amount" label="Value"></v-text-field>
        <v-btn @click="dialog = false">Close</v-btn>
        <v-btn v-if="isAdd" @click="onAddClick">ADD</v-btn>
        <v-btn v-if="isSave" @click="onSaveClick">SAVE</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
 
 <script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AddPaymentForm",
  data() {
    return {
      dialog: false,
      date: "",
      category: "",
      amount: 0,
      isAdd: false,
      isSave: false,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    getCats() {
      return this.getCategoryList;
    },
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate() + "";
      const m = ("0" + (today.getMonth() + 1)).slice(-2);
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    ...mapActions(["loadCategories"]),
    ...mapMutations(["addDataToPaymentsList", "editDataToPaymentsList"]),
    onAddClick() {
      const data = {
        id: this.id,
        date: this.date || this.getCurrentDate,
        category: this.category || "Unknown",
        value: this.amount,
      };
      this.addDataToPaymentsList({ num: 1, item: data });
      this.dialog = false;
    },
    onSaveClick() {
      const data = {
        id: this.id,
        date: this.date || this.getCurrentDate,
        category: this.category || "Unknown",
        value: this.amount,
      };
      this.editDataToPaymentsList({ num: 1, item: data });
      this.dialog = false;
    },
    onShown(item, settings) {
      this.amount = item.value;
      this.category = item.category;
      this.date = item.date;
      this.id = item.id;
      this.settings = settings;
      const { action } = settings;
      this.isAdd = action === "addpaymentform";
      this.isSave = action === "editpaymentform";
      this.dialog = true;
    },
  },
  mounted() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
    this.$modal.EventBus.$on("show", this.onShown);
  },
};
</script>
