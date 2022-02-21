<template>
  <div>
    <v-app>
      <v-app-bar app flat>
        <v-btn plain :ripple="false" to="/dashboard"> Dashboard </v-btn>
        <v-btn plain :ripple="false" to="/about"> About </v-btn>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>

    <transition name="fade">
      <ContextMenu></ContextMenu>
    </transition>
    <transition name="fade">
      <AddPaymentForm></AddPaymentForm>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ContextMenu from "./components/ContextMenu.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";

export default {
  name: "App",

  components: {
    ContextMenu,
    AddPaymentForm,
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(["setPageList", "setDataToPaymentList", "setPageNum"]),
  },
  created() {
    this.setPageList();
    let num = 1; // Имитация нажатия кнопки "1" компонента пагинации
    this.setDataToPaymentList(num);
    this.setPageNum(num);
  },
};
</script>
