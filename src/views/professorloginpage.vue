<template>
    <div class="q-pa-md" style="max-width: 400px">
    <q-form ref="myform" @submit="login" @reset="reset"   class="q-gutter-md"
    autofocus greedy
   >
    <q-input v-model="email" label="email" type="text" required
    lazy-rules="ondemand"
    :rules="[val => val.length > 0 || 'Please type your email', val => /.+@.+/.test(val) || 'E-mail must be valid']"
    />
    <q-input v-model="password" label="password" type="password"
     lazy-rules="ondemand"
    :rules="[val => val.length > 0 || 'Please type your password',
    val => val.length > 3 || 'Password must be more than 5 characters',
    val => val.length < 15 || 'Password must be less than 15 characters']"
    />
    <div>

    <q-btn type="submit" label="submit"/>
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
    </q-form>
    <q-btn label="signup" elevated @click="signup"/> 
    </div>

</template>
<script>
import axios from 'axios'
import { Notify } from 'quasar'
export default {
    name: 'professorloginpage',
    data() {
        return {
            email: '',
            password: '',
            error: null,
        }
    },
    mounted() {
        if(localStorage.getItem('professortoken')){
             this.$router.replace('/professorPage');
         }
    },
    methods: {
        reset() {
            this.email = '';
            this.password = null;
        },
        showNotificationUnauth() {
            Notify.create({
                message: 'Invalid Credentials',
                color: 'negative',
                icon: 'notifications'
            })
        },
        showNotification() {
            Notify.create({
                message: 'Login Successful',
                color: 'positive',
                icon: 'notifications'
            })
        },
        signup() {
            this.$router.push('/professorregisterpage');
        },
        login() {
            if (this.$refs.myform.validate()) {
            axios.post(
                'http://localhost:5000/professorregister/login',
                {
                    email: this.email,
                    password: this.password
                }
            ).then((response) => {
                if (response.status === 200) {
                    this.showNotification();
                    localStorage.setItem('professortoken', response.data.professortoken);
                    this.$router.push('/professorPage');
                }
                else {
                   
                }

            }).catch((error) => {
                this.error = error.response.data;
                this.showNotificationUnauth();
            });
        }
        }
    }
}
</script>

<style>
</style>