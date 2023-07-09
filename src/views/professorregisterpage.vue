<template>
   <q-ajax-bar />
  <q-layout>
    <q-header class="bg-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat label="Home" @click="routetohome()" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="login-container">
          <h4>Professor Registration</h4>
    <q-form @submit="signup" @reset="reset" class="q-gutter-md" greedy>
      <div class="form-content">
      <q-input
        type="email"
        label="email"
        clear-icon="clear"
        v-model="email"
        required
        lazy-rules="ondemand"
        :rules="[
          (val) => val.length > 0 || 'Please type your email',
          (val) => /.+@.+/.test(val) || 'E-mail must be valid',
        ]"
      />
      <q-input
        type="password"
        label="password"
        v-model="password"
        required
        lazy-rules="ondemand"
        :rules="[
          (val) => val.length > 0 || 'Please type your password',
          (val) => val.length > 3 || 'Password must be more than 5 characters',
          (val) =>
            val.length < 15 || 'Password must be less than 15 characters',
        ]"
      />
      <q-input
        type="text"
        label="username"
        v-model="name"
        required
        autofocus
        lazy-rules="ondemand"
        :rules="[(val) => val.length > 0 || 'Please type your username']"
      />

      <q-select
        v-model="department"
        bottom
        end
        :options="options"
        transition-show="flip-up"
        hide-dropdown-icon
        transition-hide="flip-down"
        options-cover
        menu-offset="[100,100]"
        label="Department"
      />

      <div class="button-group">
        <q-btn type="submit" label="signup" />
        <q-btn
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          label="reset"
        />
      </div>
      </div>
    </q-form>
    <div class="login-actions">
            <span>Already have an account?</span>
    <q-btn @click="login" label="signin" />
      </div>
    </div>
   </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import ProfService from "../services/getprofs";
import profservice from "../services/getprofs";
export default {
  name: "professorregisterpage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      department: "",
      error: null,
      options: ["EE", "CSE", "ME", "CE", "MT", "BB", "CH", "AI"],
    };
  },
  methods: {
    routetohome() {
      this.$router.push("/");
    },
    login() {
      this.$router.push("/professorloginpage");
    },
    async signup() {
      const prof = await ProfService.registerProf(
        this.name,
        this.email,
        this.password,
        this.department
      );
      if (prof.status == 200) {
        this.$router.push("/professorloginpage");
      } else {
        this.error = "Invalid Credentials";
      }
    },
  },
};
</script>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 0 20px;
}

.form-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  min-width: 300px;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.login-actions {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.login-actions span {
  margin-right: 10px;
}

.q-input__control {
  border-color: #000000;
}

.q-input__label {
  color: #000000;
}

.q-input__bottom-row .q-field__messages {
  color: #f44336;
}

.q-btn {
  margin-top: 10px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 0 20px;
}

.form-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  max-width: 500px; /* Increased width */
  width: 100%;
  margin: 0 auto; /* Center the form horizontally */
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.login-actions {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.login-actions span {
  margin-right: 10px;
}

.q-input__control {
  border-color: #000000;
}

.q-input__label {
  color: #000000;
}

.q-input__bottom-row .q-field__messages {
  color: #f44336;
}

.q-btn {
  margin-top: 10px;
}


</style>
