<template>
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark v-on="on">
              ADD NEW COST <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-text-field v-model="date" label="Date"></v-text-field>
            <v-select
              v-model="category"
              label="Category"
              :items="getCats"
            ></v-select>
            <v-text-field v-model.number="amount" label="Value"></v-text-field>
            <v-btn @click="dialog = false">Close</v-btn>
            <v-btn @click="onSaveClick">ADD</v-btn>
          </v-card>
        </v-dialog>
        <PaymentsDisplay />
      </v-col>
      <v-col>
        <!-- <Diagram /> -->
        Diagram
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      date: "",
      category: "",
      amount: 0,
    };
  },
  components: {
    PaymentsDisplay,
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    getCats() {
      return this.getCategoryList;
    },
  },
  methods: {
    ...mapActions(["loadCategories"]),
    ...mapMutations(["addDataToPaymentsList"]),
    onSaveClick() {
      const data = {
        id: this.id,
        date: this.date || this.getCurrentDate,
        category: this.category || "Unknown",
        value: this.amount,
      };
      this.addDataToPaymentsList({ num: 1, item: data });
      this.dialog = false;
    },
  },
  mounted() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
  },
};
</script>
