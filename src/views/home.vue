<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="title">Design Credit Registration Portal</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <q-page class="landing-page">
        <div class="content">
          <div class="q-gutter-lg row justify-center">
            <div class="title">Welcome to the Design Credit Registration Portal</div>
            <div class="buttons row">
              <q-btn
                color="primary"
                class="student-btn"
                size="lg"
                @click="redirectTo('/studentloginpage')"
              >
                Student Portal
              </q-btn>
              <q-btn
                color="secondary"
                class="professor-btn"
                size="lg"
                @click="redirectTo('/professorloginpage')"
              >
                Professor Portal
              </q-btn>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template> -->
<template>
  <q-layout>
    <q-header class="navbar">
      <div class="q-pa-md">
        <div class="row justify-center">
          <h1 class="navbar-title">Design Credit Portal</h1>
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
<!-- 
<style scoped>
.landing-page {
  background-color: #f1f5f9;
}

.header {
  background-color: #ffffff;
  color: #1e2022;
}

.toolbar {
  justify-content: center;
}

.title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
}

.buttons {
  margin-top: 30px;
}

.student-btn {
  margin-right: 20px;
}

.professor-btn {
  margin-left: 20px;
}
</style> -->
