<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="teal" dark @click="onAddNewCost()">
          ADD NEW COST <v-icon>mdi-plus</v-icon>
        </v-btn>
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

export default {
  components: {
    PaymentsDisplay,
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate() + "";
      const m = ("0" + (today.getMonth() + 1)).slice(-2);
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    onAddNewCost() {
      const settings = {
        header: "1234",
        action: "addpaymentform",
      };
      const data = {
        id: 0,
        date: this.getCurrentDate,
        category: "",
        value: 0,
      };
      this.$modal.show(data, settings);
    },
  },
};
</script>
