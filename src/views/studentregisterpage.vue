<template>
    <h3>{{ error }}</h3>
    <div class="signup-page-outside-form">
        <form v-on:submit="signup">
            <div class="signup-page">
    <label>
        email:
    <input type="email" v-model="email" required>
    </label>
    <label>
        password:
    <input type="password" v-model="password" required>
    </label>
    <label for="department">Choose a department:</label>
    <select id="department" name="department" v-model="department" required>
        <option value="EE">EE</option>
        <option value="CSE">CSE</option>
        <option value="ME">ME</option>
        <option value="BB">BB</option>
        <option value="CH">CH</option>
        <option value="MT">MT</option>
        <option value="CI">CI</option>
        <option value="AI">AI</option>
    </select>

    <label>
        skill-1:
        <input type="text" v-model="skillsstudent[0]" required>
    </label>
    <label>
        skill-2:
        <input type="text" v-model="skillsstudent[1]" required>
    </label>
    <label>
        skill-3:
        <input type="text" v-model="skillsstudent[2]" required>
    </label>
    <label>
        name:
        <input type="text" v-model="name" required>
    </label>

    <button type="submit">signup</button>
            </div>
        </form>
            <button @click="login">account already exists? </button>
        </div>

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
            skillsstudent:[],
            error: null,
        }
    },
    methods: {
        login() {
            this.$router.replace('/studentloginpage');
        },
        async signup(e) {
            e.preventDefault() // prevent page reload
            const student = await studentservice.registerstudent(this.name, this.email, this.password,  this.department,this.skillsstudent);
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
@import "../assets/basecss.css";
</style>