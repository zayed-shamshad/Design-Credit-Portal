<template>
    <button @click="shownotifs">
        show notifications
    </button>
    <div class="sidepanel" v-if="showNotifs && notifs">
                <h3>
                    {{notifs.projectid}}
                </h3>
                <h3>
                    {{notifs.message}}
                </h3>
                <h3>
                    <button @click="remove()">X</button>
                </h3>
    </div>
    <button @click="logout">
logout
    </button>
    <div v-if="requestsstatus=='accepted'" class="project-card">
        <h2>{{myproject.title }}</h2>
        <p>{{ myproject.description }}</p>
        <p>{{ myproject.department }}</p>

    </div>
    <div v-if='requestsstatus == "notApplied" || requestsstatus == "pending" || requestsstatus=="rejected"' class="department-container">
        <div v-for="i in cards" :key="i" class="department-card">
             {{i}}
             <button v-on:dblclick="routetodepartment(i)">
                checkout
             </button>
        </div>
    </div>
  
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import projectservice from '../getprojectservice';
import studentservice from '../services/getstudent';
export default {
    name: 'student',
    data() {
        return {
            socket:null,
            showNotifs: false,
            notifs:null,
            cards:['EE','CSE','ME','CIE','CH','BB','MT','AI'],
            error: null,
            name: '',
            department: '',
            email: '',
            requestsstatus:'',
            project: null,
            myproject: {
                title: '',
                description: '',
                department: ''
            },
            skills:[],
            rejected:[],
            student: null

        }
    },
    mounted(){
        this.socket.on('studentaccepted', (data1,data2,data3,title,desc,dept,studentid) => {
            if(studentid==this.student){
                this.notifs = data2;
                this.requestsstatus = data1;
                this.project = data3;
                this.myproject.title = title;
                this.myproject.description = desc;
                this.myproject.department = dept;
            }
        });
        this.socket.on('studentrejected', (requestsstatus, notifs, studentId, title, desc, dept) => {
            if (studentId == this.student) {
                this.notifs = notifs;
                this.requestsstatus =requestsstatus
                this.myproject.title = title;
                this.myproject.description = desc;
                this.myproject.department = dept;
            }
        });
    },
    async created(){
        this.socket = io('http://localhost:5000');
        try{
            this.projects=await allprojectservice.getprojects();
        }
        catch(err){
            this.error=err;
        }
        try{
            axios.get('http://localhost:5000/studentregister/user',{
                headers:{
                    'studenttoken':localStorage.getItem('studenttoken')
                }
            }).then(async (response) => {

                this.student=response.data.student._id;
                this.name=response.data.student.name;
                this.department=response.data.student.department;
                this.email=response.data.student.email;
                this.requestsstatus=response.data.student.requestsstatus;
                this.notifs=response.data.student.notifs;
                this.rejected=response.data.student.rejected;
                this.project=response.data.student.project;
                this.skills=response.data.student.skills;
                console.log("this is notifs in studentPage",this.notifs);
                
                
                console.log("this is the project of the student ",response.data.student.project);
                    try{
                    await projectservice.getaproject(response.data.student.project).then(res => {
                        console.log(res);
                        this.myproject.title=res.title;
                        this.myproject.description=res.description;
                        this.myproject.department=res.department;
                    
                    })
                    }
                    catch(err){
                        console.log(err);
                    }
            
                }
            ).catch(err => {
                console.log(err);
            })
        }
        catch(err){
           console.log(err);
        }
    }
    ,methods:{
       async remove(){
            this.notifs={
                "projectid":null,
                "message":''
            };
            await studentservice.updatestudent(this.student, this.name, this.department, this.email, this.project, this.requestsstatus, this.notifs, this.skills, this.rejected);

        },
        shownotifs(){
            this.showNotifs=!this.showNotifs;
        },
        logout(){
            localStorage.removeItem('studenttoken');
            this.$router.push('/studentloginpage');
        },
        routetodepartment(dept){
            this.$router.push('/department/'+dept);
        },
    }
}
</script>
<style>
.department-container{
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
    flex-direction: row;

}
.department-card{
    width: 300px;
    height: 300px;
    background-color: #f1f1f1;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
.project-card {
    width: 300px;
    height: 300px;
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
.sidepanel {
    width: 20vw;
    height: 100vh;
    position: fixed;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>