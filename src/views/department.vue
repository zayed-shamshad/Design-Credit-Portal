<template>
    <div class="project-container">
        <div class="project-card" v-for="(project,ind) in getopenprojects" :key="project._id" :value="ind" >
            <h2>{{project.title }}</h2>
            <p>{{ project.description }}</p>
            <p>{{ project.department }}</p>
            <button v-if="requestsstatus=='notApplied' || requestsstatus=='rejected'" @click="apply(ind)">
                apply
            </button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import allprojectservice from '../services/getallprojects'
import projectservice from '../getprojectservice'
import profservice from '../services/getprofs'
import studentservice from '../services/getstudent'
export default {
    name: 'department',
    data() {
        return {
            socket:null,
            projects: [],
            error: null,
            name: '',
            department: '',
            email: '',
            requestsstatus: 'notApplied',
            myproject: null,
            student: null,
            rejected:[]
        }
    },
    async mounted(){
        try {
            axios.get('http://localhost:5000/studentregister/user', {
                headers: {
                    'studenttoken': localStorage.getItem('studenttoken')
                }
            }).then((response) => {

                this.name = response.data.student.name;
                this.department = response.data.student.department;
                this.email = response.data.student.email;
                this.requestsstatus = response.data.student.requestsstatus;
                this.myproject = response.data.student.myproject;
                this.student = response.data.student._id;
                this.rejected = response.data.student.rejected;
            }).catch((error) => {
                console.log(error);
            });
        }
        catch (err) {
            console.log(err);
        }

    },
    async created() {
        this.socket=io('http://localhost:5000');
        console.log('The department is: ' + this.$route.params.dept);
        try {
            this.projects = await allprojectservice.getprojectsbydept(this.$route.params.dept);
        }
        catch (err) {
            this.error = err;
        }
       
    },
    computed:{
        getopenprojects(){
            return this.projects.filter((project)=>{
                return project.status && project.number>0 && !this.rejected.includes(project._id);
            })
        }
    },
    methods:{
        async apply(ind) {
            await projectservice.getaproject(this.projects[ind]._id).then(async (response) => {
                console.log(response);
              await profservice.getprofbyid(response.professor).then(
                    async (res)=>{
                        console.log(res._id);
                      res.notifs.push({ studentid: this.student, projectid: this.projects[ind]._id });
                      this.socket.emit('studentapply', res.notifs, this.student, res._id, response._id);
                      await profservice.updateprof(res._id, res.name, res.email, res.department, res.projects, res.notifs).then(
                          () => {
                            console.log("applied for the project and notied the prof by emitting the event ",this.projects[ind]._id,this.student);
                              
                          }
                      );
                      this.requestsstatus = 'pending';
                      await studentservice.updatestudent(this.student, this.name, this.department, this.email,  this.myproject, this.requestsstatus)
                    }).finally(()=>{
                        alert("applied for the project successfully ");
                    })
                    });
        }
    }
   
}
</script>
<style>

.project-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    background-color:var(--blue);
    width:100vw;
    min-height:100vh;
    align-content: center;
    align-items: center;

}
.project-card {
    width: 350px;
    height: 350px;
    background-color: #f1f1f1;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
.project-card button{
    width: 100px;
    height: 50px;
    background-color: #f1f1f1;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
</style>