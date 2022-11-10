<template>
    <h3>{{ error }}</h3>
    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <input type="text" v-model="department">
    <input type="text" v-model="name">
    <button @click="signup">signup</button>
    <button @click="login">account already exists? </button>
</template>
<script>
import profservice from '../services/getprofs'
export default {
    name: 'professorregisterpage',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            department: "",
            error: null,
        }
    },
    methods: {
        login() {
            this.$router.push('/professorloginpage');
        },
        async signup() {
            const prof = await profservice.registerprof(this.name, this.email, this.password, this.department);
            if (prof.status == 200) {
                this.$router.push('/professorloginpage');
            }
            else {
                this.error = "Invalid Credentials";
            }
        }
    }
}
</script>

<style>

</style>