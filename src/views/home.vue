<template>
    <div class="homepage-navbar">
        Design credit portal
    </div>
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
    },
    mounted(){
        // if(this.studenttoken){
        //     this.$router.replace('/studentPage');
        // }
        // if(this.professortoken){
        //     this.$router.replace('/professorPage');
        // }
    }

}
</script>

<style>
:root {
    --blue: #00ADB5;
    --white: #ffffff;
}

.homepage{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--blue);
}
.homepage a{
    border-radius: 20px;
    background-color: white;
    padding:40px;
    color:var(--blue);
    text-decoration: none;
    margin: 0 20px;
    font-size: 20px;
}
.homepage a:hover{
    color: rgb(25, 94, 147);
}
.homepage-navbar{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background-color: var(--white);
    color:var(--blue);
    font-size: 30px;
    width:100vw;
    position:absolute;
}
</style>