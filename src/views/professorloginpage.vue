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
        <h4>Professor login</h4>
            <q-form
              ref="myform"
              @submit="login"
              @reset="reset"
              class="q-gutter-md"
              autofocus
              greedy
            
            >
            <div class="form-content">
              <q-input
                v-model="email"
                label="email"
                type="text"
                required
                lazy-rules="ondemand"
                :rules="[
                  (val) => val.length > 0 || 'Please type your email',
                  (val) => /.+@.+/.test(val) || 'E-mail must be valid',
                ]"
              />
              <q-input
                v-model="password"
                label="password"
                type="password"
                lazy-rules="ondemand"
                :rules="[
                  (val) => val.length > 0 || 'Please type your password',
                  (val) =>
                    val.length > 3 || 'Password must be more than 5 characters',
                  (val) =>
                    val.length < 15 ||
                    'Password must be less than 15 characters',
                ]"
              />
              <div>
                <q-btn type="submit" label="submit" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
              </div>
            </q-form>
             <div class="q-pa-md q-gutter-sm q-gutter-md row justify-center items-center">
  <div class="col-auto">
    <span>Don't have an account?</span>
  </div>
  <div class="col-auto">
    <q-btn label="Sign Up" elevated @click="signup" />
  </div>
</div>
            </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import axios from "axios";
import { Notify } from "quasar";
export default {
  name: "professorloginpage",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  mounted() {
    if (localStorage.getItem("professortoken")) {
      this.$router.replace("/professorPage");
    }
  },
  methods: {
     routetohome() {
      this.$router.push("/");
    },
    reset() {
      this.email = "";
      this.password = null;
    },
    showNotificationUnauth() {
      Notify.create({
        message: "Invalid Credentials",
        color: "negative",
        icon: "notifications",
      });
    },
    showNotification() {
      Notify.create({
        message: "Login Successful",
        color: "positive",
        icon: "notifications",
      });
    },
    signup() {
      this.$router.push("/professorregisterpage");
    },
    login() {
      if (this.$refs.myform.validate()) {
        axios
          .post("http://localhost:5000/professorregister/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.status === 200) {
              this.showNotification();
              localStorage.setItem(
                "professortoken",
                response.data.professortoken
              );
              this.$router.push("/professorPage");
            } else {
            }
          })
          .catch((error) => {
            this.error = error.response.data;
            this.showNotificationUnauth();
          });
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

form {
  max-width: 400px;
  width: 100%;
}

.form-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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


