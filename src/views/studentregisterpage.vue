<template>
    <h3>{{ error }}</h3>
    <label>
        email:
    <input type="text" v-model="email">
    </label>
    <label>
        password:
    <input type="text" v-model="password">
    </label>
    <label>
        department
    <input type="text" v-model="department">
    </label>
    <label>
        name:
        <input type="text" v-model="name">
    </label>

    <button @click="signup">signup</button>
    <button @click="login">account already exists? </button>
</template>
<script>
import studentservice from '../services/getstudent'
export default {
    name: 'studentregisterpage',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            department:"",
            error: null,
        }
    },
    methods: {
        login() {
            this.$router.push('/studentloginpage');
        },
        async signup() {
            const student = await studentservice.registerstudent(this.name, this.email, this.password,  this.department);
            if(student.status==200){
                this.$router.push('/studentloginpage');
            }
            else{
                this.error="Invalid Credentials";
            }
        }
    }
}
</script>

<style>

</style>