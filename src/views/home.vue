<template>
    <div class="homepage">
         
    <router-link to="/studentloginpage">Student</router-link>
    <router-link to="/professorloginpage">Professor</router-link>
    </div>
</template>

<script>
export default {
    name: 'home',
    data(){
        return {
            studenttoken: localStorage.getItem('studenttoken'),
            professortoken: localStorage.getItem('professortoken'),
        }
    }

}
</script>

<style>
.root{
    --blue: #00ADB5;
    --white: #EEEEEE;
}
.homepage{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:navy;
}
.homepage a{
    border-radius: 20px;
    background-color: white;
    padding:20px;
    color:navy;
    text-decoration: none;
    margin: 0 20px;
    font-size: 20px;
}
.homepage a:hover{
    color: rgb(92, 85, 233);
}
</style>