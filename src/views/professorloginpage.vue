<template>
    <h3>{{ error }}</h3>
    <div class="signup-page-outside-form">
        <form v-on:submit="login">
            <div class="signup-page">
    <label>
        email:
        </label>
     <input type="text" v-model="email">
    
    <label>
        password:
        </label>
    
    <input type="password" v-model="password">
    
    <button type="submit">Login</button>
    </div>
    </form>
    <button @click="signup">no account? </button>
    </div>

    

</template>
<script>
//import studentservice from '../services/getstudent'
import axios from 'axios'
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
        signup() {
            this.$router.push('/professorregisterpage');
        },
        login(e) {
            e.preventDefault() 
            axios.post(
                'http://localhost:5000/professorregister/login',
                {
                    email: this.email,
                    password: this.password
                }
            ).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem('professortoken', response.data.professortoken);
                    this.$router.push('/professorPage');
                }
                else {
                    this.error = "Invalid Credentials";
                }
            }).catch((error) => {
                console.log(error);
            });
            //    await studentservice.loginstudent(this.email,this.password).then((res)=>{
            //        console.log(this.email);
            //        console.log(this.password);
            //        if(res.status==200){
            //            localStorage.setItem('token',res.data.token);
            //            this.$router.push('/studentPage');
            //        }
            //     }).catch((err)=>{
            //         this.error=err;
            //     })
        }
    }
}
</script>

<style>
@import "../assets/basecss.css";
</style>