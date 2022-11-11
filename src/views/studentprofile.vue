<template>
    <div class="outer-profile">

   
    <div class="profile-card">
        <h3>
            name:{{name}}
        </h3>
        <h3 >
            email:{{email}}
        </h3>
        <h3 >
            department:{{department}}
        </h3> 
        <h3 >
            skills:{{skills[0]}}
            {{skills[1]}}
            {{skills[2]}}
                
        </h3>

    </div>
    </div>
  
</template>

<script>
import studentservice from '../services/getstudent'
export default {
    name: 'studentprofile',
    data(){
        return{
        name:'',
        email:'',
        department:'',
        skills:[],
        error:null,
        }
    },
    async created(){
        try{
            const student=await studentservice.getstudentbyid(this.$route.params.student);
            console.log(student);
            this.name=student.name;
            this.email=student.email;
            this.department=student.department;
            this.skills=student.skills;
        }
        catch(err){
            this.error=err;
        }
    }
}
</script>

<style>
.profile-card{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color:var(--white);
    height:300px;
    padding:30px;
    border-radius:10px;

}
.outer-profile{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--blue);
}
</style>