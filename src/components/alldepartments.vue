

<template>
  <div class="">
    <q-input
      v-model="searchText"
      filled
      dense
      placeholder="Search..."
      class="q-ma-md bg-white"
      @clear="clearSearch"
    />
  </div>
  <div class="department-container row">
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
         <TransitionGroup name="q-transition--scale">
        <div
          v-for="(card, index) in filteredCards"
          :key="index"
          :data-id="index"
          class="q-pa-sm flex flex-center relative-position example-item"
          v-intersection="onIntersection"
        >
          <transition name="q-transition--scale">
            <q-card v-if="inView[index]">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-card-section>
                <div class="text-h6">{{ card }}</div>
                <q-btn class="text-subtitle2" @click="routetodepartment(card)">
                  checkout
                </q-btn>
              </q-card-section>
            </q-card>
          </transition>
        </div>
        </TransitionGroup>
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
      searchText: "",
    };
  },
  computed: {
    filteredCards() {
      if (!this.searchText) {
        return this.cards;
      }
      const searchTextLower = this.searchText.toLowerCase();
      return this.cards.filter((card) =>
        card.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    onIntersection(entry) {
      const index = parseInt(entry.target.dataset.id, 10);
      setTimeout(() => {
        this.inView.splice(index, 1, entry.isIntersecting);
      }, 50);
    },
    routetodepartment(dept) {
      console.log(dept);
      this.$router.push("departments/" + dept);
    },
    clearSearch() {
      this.searchText = "";
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

