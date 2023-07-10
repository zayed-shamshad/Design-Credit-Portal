<template>
  <q-layout>
    <q-header class="navbar">
      <div class="q-pa-md">
        <div class="row justify-center">
          <h2 class="navbar-title">Design Credit Portal</h2>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <div class="content">
        <div class="row justify-center">
          <div class="button-container">
            <q-btn
              class="action-button"
              label="Student"
              color="primary"
              flat
               @click="redirectTo('/studentloginpage')"
              rounded
            />
            <q-btn
              class="action-button"
              label="Faculty"
              color="secondary"
              flat
             @click="redirectTo('/professorloginpage')" 
              rounded
            />
          </div>
        </div>
      </div>
    </q-page-container>

    <q-footer class="footer">
      <div class="row justify-center">
        <p>&copy; 2023 Design Credit Portal. All rights reserved.</p>
      </div>
    </q-footer>
  </q-layout>
</template>

<style>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.action-button {
  margin: 0 10px;
}

.footer {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  color: #000;
}
</style>


<script>
export default {
  name: 'LandingPage',
  methods: {
    redirectTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

