<template>
    <h3>{{ error }}</h3>
   
<div class="signup-page-outside-form">
    <form v-on:submit="signup">
        <div class="signup-page">
    <label> email</label>
    <input type="email" v-model="email" required>
    <label> password</label>
    <input type="password" v-model="password" required> 
    <label> name</label>
    <input type="text" v-model="name" required>
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
    <button type="submit">signup</button>
    </div>
    </form>
    <button @click="login">account already exists? </button>
    </div>
  
   

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
        async signup(e) {
            e.preventDefault() // prevent page reload
            console.log(this.department)
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
@import "../assets/basecss.css";


</style>