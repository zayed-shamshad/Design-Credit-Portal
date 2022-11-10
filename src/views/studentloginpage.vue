<template>
    <h3>{{error}}</h3>
    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <button @click="login">Login</button>
    <button @click="signup">no account? </button>
</template>
<script>
//import studentservice from '../services/getstudent'
import axios from 'axios'
export default {
    name: 'studentloginpage',
    data(){
        return{
            email:'',
            password:'',
            error:null,
        }
    },
    mounted(){
        // if(localStorage.getItem('token')){
        //     this.$router.push('/studentPage');
        // }
    },
    methods:{
         signup(){
            this.$router.push('/studentregisterpage');
        },
        login(){
            axios.post(
                'http://localhost:5000/studentregister/login',
                {
                    email: this.email,
                    password: this.password
                }
            ).then((response) => {
                console.log(response);
                if(response.status===200){
                    localStorage.setItem('studenttoken', response.data.studenttoken);
                    this.$router.push('/studentPage');
                }
                else{
                    this.error="Invalid Credentials";
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
    }}
}
</script>

<style>

</style>