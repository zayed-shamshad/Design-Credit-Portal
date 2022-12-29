<template>
  <div class="department-container row">
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <div
          v-for="index in inView.length"
          :key="index"
          :data-id="index - 1"
          class="q-pa-sm flex flex-center relative-position example-item"
          v-intersection="onIntersection"
        >
          <transition name="q-transition--scale">
            <q-card v-if="inView[index - 1]">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-card-section>
                <div class="text-h6">{{ cards[index - 1] }}</div>
                <q-btn
                  class="text-subtitle2"
                  v-on:click="routetodepartment(cards[index - 1])"
                  >checkout</q-btn
                >
              </q-card-section>
            </q-card>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alldepartment",
  props: {
    requestsstatus: {
      type: String,
    },
  },
  data() {
    return {
      inView: [false, false, false, false, false, false, false, false],
      cards: ["EE", "CSE", "ME", "CIE", "CH", "BB", "MT", "AI"],
    };
  },
  methods: {
    onIntersection(entry) {
      const index = parseInt(entry.target.dataset.id, 10);
      console.log(index);
      setTimeout(() => {
        this.inView.splice(index, 1, entry.isIntersecting);
      }, 50);
    },
    routetodepartment(dept) {
      this.$router.push("departments/" + dept);
    },
  },
};
</script>
<style scoped>
.example-item {
  height: 400px;
  width: 400px;
}
</style>
