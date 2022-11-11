<template>
    <div class="profile-card">
        <h3>
            {{name}}
        </h3>
        <h3 >
            {{email}}
        </h3>
        <h3 >
            {{department}}
        </h3>    
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
    flex-direction: row;
    width:300px;
    height:300px;
}
</style>