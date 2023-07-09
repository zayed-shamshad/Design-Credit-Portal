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
          <h4>Student Registration</h4>
          <q-form
            @submit="signup"
            @reset="reset"
            ref="myform"
            greedy
            class="q-gutter-md"
            autofocus
          >
            <div class="form-content">
              <q-input
                type="email"
                label="Email"
                clearable
                v-model="email"
                required
                lazy-rules="ondemand"
                :rules="[
                  (val) => val.length > 0 || 'Please type your email',
                  (val) => /.+@.+/.test(val) || 'E-mail must be valid',
                ]"
              />
               <q-input
                type="text"
                label="Username"
                v-model="name"
                required
                autofocus
                lazy-rules="ondemand"
                :rules="[
                  (val) => val.length > 0 || 'Please type your username',
                ]"
              />

              <q-input
                type="password"
                label="Password"
                v-model="password"
                required
                lazy-rules="ondemand"
                :rules="[
                  (val) => val.length > 0 || 'Please type your password',
                  (val) => val.length > 3 || 'Password must be more than 5 characters',
                  (val) => val.length < 15 || 'Password must be less than 15 characters',
                ]"
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
              <q-select
                filled
                v-model="skillsstudent"
                multiple
                :options="skills"
                counter
                max-values="5"
                hint="Max 5 selections"
                use-chips
                use-input
              />

              <div class="button-group">
                <q-btn type="submit" label="Sign Up" color="primary" />
                <q-btn
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                  label="Reset"
                />
              </div>
            </div>
          </q-form>
          <div class="login-actions">
            <span>Already have an account?</span>
            <q-btn @click="login" label="Sign In" color="primary" flat />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Notify } from "quasar";
import StudentService from "../services/getstudent";

export default {
  name: "studentregisterpage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      department: "",
      skillsstudent: [],
      error: null,
      options: ["EE", "CSE", "ME", "CE", "MT", "BB", "CH", "AI"],
      skills: [
        "Web Development",
        "App Development",
        "Machine Learning",
        "Data Science",
        "Blockchain",
        "Cloud Computing",
        "Cyber Security",
        "Networking",
        "Embedded Systems",
        "Robotics",
        "IoT",
        "Digital Marketing",
        "UI/UX",
        "Game Development",
        // Add more skills as needed
      ],
    };
  },
  methods: {
    routetohome() {
      this.$router.push("/");
    },
    reset() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.department = "";
      this.skillsstudent = [];
      this.error = null;
    },
    showNotification(type, message) {
      Notify.create({
        message: message,
        color: type,
        position: "top",
        timeout: 2000,
        actions: [{ icon: "close", color: "white" }],
      });
    },
    login() {
      this.$router.replace("/studentloginpage");
    },
    async signup() {
      if (this.$refs.myform.validate()) {
        const student = await StudentService.registerStudent(
          this.name,
          this.email,
          this.password,
          this.department,
          this.skillsstudent
        );
        if (student.status == 200) {
          this.$router.push("/studentloginpage");
          this.showNotification("positive", "Registration successful");
        } else {
          this.error = "Invalid Credentials";
          this.showNotification("negative", "Error: Registration failed");
        }
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
