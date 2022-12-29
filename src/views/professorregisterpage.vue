<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="signup" @reset="reset" class="q-gutter-md" greedy>
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
        style="width: 600px"
        options-cover
        menu-offset="[100,100]"
        label="Department"
      />

      <div>
        <q-btn type="submit" label="signup" />
        <q-btn
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          label="reset"
        />
      </div>
    </q-form>
    <q-btn @click="login" label="signin" />
  </div>
</template>
<script>
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
    login() {
      this.$router.push("/professorloginpage");
    },
    async signup() {
      const prof = await profservice.registerprof(
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

<style scoped></style>
