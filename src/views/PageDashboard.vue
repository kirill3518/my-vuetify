<template>
  <v-container>
    <div class="text-h5 text-sm-h3 mb-8">My personal costs</div>
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
    <v-pagination v-model="page" :length="6" @input="pagInput"></v-pagination>
  </v-container>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      page: 1,
    };
  },
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
    ...mapMutations(["setPageNum", "setDataToPaymentList"]),
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
    pagInput() {
      console.log(this.page);
      this.setDataToPaymentList(this.page);
      this.setPageNum(this.page);
    },
  },
};
</script>
