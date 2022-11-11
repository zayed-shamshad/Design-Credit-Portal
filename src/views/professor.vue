<template>
    <div class="profnavbar">
        <button @click="logout">
            logout
        </button>
        <button @click="showcreateprojectbox">
           Add a project
        </button>
        <button @click="shownotifs">
            show notifications
        </button>
    </div>

    <div class="edit-project-container" v-if="showedit">
            <form v-on:submit="updateproject">
        <div class="edit-project" v-bind="editindex">
        <input type="text" id="create-post" v-model="edittitle" :placeholder=projects[editindex].title>
        <input type="text" id="create-post" v-model="editdescription" :placeholder=projects[editindex].description>
        <label>change status of project </label>
        <input type="checkbox" id="create-post" v-model="editstatus" :placeholder=projects[editindex].status>
        <input type="number" id="create-post" v-model="editnumber" :placeholder=projects[editindex].number>
        <input type="text" id="create-post" v-model="editdeliverables[0]" :placeholder=projects[editindex].deliverables[0]>
        <input type="text" id="create-post" v-model="editdeliverables[1]" :placeholder=projects[editindex].deliverables[1]>
        <input type="text" id="create-post" v-model="editdeliverables[2]" :placeholder=projects[editindex].deliverables[2]>
        <input type="text" id="create-post" v-model="editevaluationstatus" :placeholder=projects[editindex].evaluationstatus>
        <input type="text" id="create-post" v-model="editdepartment" :placeholder=projects[editindex].department>
        <input type="text" id="create-post" v-model="editskills[0]" :placeholder=projects[editindex].skills[0]>
        <input type="text" id="create-post" v-model="editskills[1]" :placeholder=projects[editindex].skills[1]>
        <input type="text" id="create-post" v-model="editskills[2]" :placeholder=projects[editindex].skills[2]>
        <button type="submit">
            Save
        </button>
        </div>
    </form>
        <button @click="showeditform(editindex)">
            cancel
        </button>
    </div>

  

    <div class="sidepanel" v-if="showNotifs"> 
        <ul>
        <li v-for="(notification,ind) in notifs" :key="ind" :value="notification" class="notif">
            <div>
                Student Name:
                {{notifstudent[ind].name}}
                Department:
                {{notifstudent[ind].department}}
            </div>
            <div>
                Project Title:
                {{notifproject[ind].title}}
                Project Description:
                {{notifproject[ind].description}}
        </div>
            <div>
                <button @click="viewStudent(ind)">
                    view
                </button>
            </div>
            <div>
               <button @click="acceptstudent(ind)">Accept</button>
                <button @click="rejectstudent(ind)">Reject</button>
            </div>
        </li>
        </ul>
    </div>
   
        
        <div class="create-project">
            <form v-on:submit="addproject">
                <div class="creat-project-inside-form">
            <input type="text" id="create-post" v-model="title" placeholder="add title" required>
            <input type="text" id="create-post" v-model="description" placeholder="add description" required>
            <input type="number" id="create-post" v-model="number" placeholder="add number of students" required>
            <input type="text" id="create-post" v-model="department" placeholder="add department" required>
            <input type="text" id="create-post" v-model="deliverables[0]" placeholder="add deliverable 1" required>
            <input type="text" id="create-post" v-model="deliverables[1]" placeholder="add deliverable 2" required>
            <input type="text" id="create-post" v-model="deliverables[2]" placeholder="add deliverable 3" required>
            <input type="text" id="create-post" v-model="skills[0]" placeholder="add skill1" required>
            <input type="text" id="create-post" v-model="skills[1]" placeholder="add skill2" required>
            <input type="text" id="create-post" v-model="skills[2]" placeholder="add skill3" required>
            <button type="submit">Add</button>
                </div>
            </form>
        </div>
        <div class="container">
        <h1>Projects</h1>
        <div class="allprojects">
           
            <div class="openclosebuttons">
                <button @click="showopenp">
                    open projects
                </button>
                <button @click="showclosedp">
                    closed projects
                </button>
            </div>
            <div class="projectsOC">
        <div class="project-container-open" v-if="showopen">
            <div class="project-card" v-for="(project, index) in  getopenprojects" :item="project" :index="index" :key="project._id">
                <h3>{{ project.title }}</h3>
                <p class="text">{{ project.description }}</p>
                <p class="text">{{ project.number }}</p>
                <!-- <p class="text" v-for="(skill, ind) in project.skills" :item="project" :index="ind" :key="ind">{{ skill }}</p> -->
                <button v-on:click="deleteproject(index)">Delete</button>
                <button v-on:click="showeditform(index)">Edit</button>
            
            </div>
        </div>
        <div class="project-container-closed" v-if="showclosed">

            <div class="project-card" v-for="(project, index) in  getclosedprojects" :item="project" :index="index"
                :key="project._id">
                <h3>{{ project.title }}</h3>
                <p class="text">{{ project.description }}</p>
                <p class="text">{{ project.number }}</p>
                <!-- <p class="text">{{ project.status }}</p> -->
                <!-- <p class="text" v-for="(skill, ind) in project.skills" :item="project" :index="ind" :key="ind">{{ skill }}</p> -->
                <!-- <button v-on:click="deleteproject(index)">Delete</button>-->
                <button v-on:click="showeditform(index)">Edit</button>
                <button @click="checkoutproject(index)">checkout </button>
            </div>
        </div>
        </div>
        </div>

    </div>
   
</template>

<script>
import io from "socket.io-client";
import axios from 'axios';
import allprojectservice from '../services/getallprojects'
import projectservice from '../getprojectservice'
import profservice from '../services/getprofs'
import studentservice from '../services/getstudent'
export default {
    name: 'professor',
    data() {
        return {
            showopen:false,
            showclosed:false,

            showcreateproject: false,
            

            socket:null,

            title: '',
            description: '',
            number:0,
            status: true,
            department: '',
            students: [],
            skills: [],
            error: null,
            projects: [],
            deliverables: [],
            evaluationstatus: "notEvaluated",

            profid:"",

            notifs: [],
            notifstudent:[],
            notifproject:[],
            prof: null,

            showedit: false,
            editindex: 0,

            edittitle: '',
            editdescription: '',
            editnumber: 0,
            editstatus: true,
            editdepartment: '',
            editskills: [],
            editdeliverables:[],
            editevaluationstatus: "notEvaluated",
            showNotifs: false,

        }
    },
  
    computed:{
        getopenprojects(){
            return this.projects.filter(project => project.status==true && project.number>0)
        }
        ,
        getclosedprojects(){
            return this.projects.filter(project => project.status==false || project.number==0)
        }
    },
    async created() {
        this.socket = io('http://localhost:5000');
        try {
            axios.get('http://localhost:5000/professorregister/user', {
                headers: {
                    'professortoken': localStorage.getItem('professortoken')
                }
            }).then(async (response) => {
                this.name = response.data.prof.name;
                this.department = response.data.prof.department;
                this.email = response.data.prof.email;
                this.profid = response.data.prof._id;
                try {
                    this.projects = await allprojectservice.getprojectsbyprof(this.profid);
                    this.prof = await profservice.getprofbyid(this.profid);
                    this.notifs = this.prof.notifs;
                    for (let i = 0; i < this.notifs.length; i++) {
                        this.notifstudent[i] = await studentservice.getstudentbyid(this.notifs[i].studentid);
                        this.notifproject[i] = await projectservice.getaproject(this.notifs[i].projectid);
                    }
                }
                catch (err) {
                    this.error = err;
                }               
            }).catch((error) => {
                console.log(error);
            });
        }
        catch (err) {
            console.log(err);
        }
    },
   mounted(){
    this.socket.on('studentapplied',async (notifs,studentid,profid,projectid) => {
        if(this.profid==profid){
            this.notifs = notifs;
            console.log(this.notifstudent);
            console.log(this.notifproject);
            for (let i = 0; i < this.notifs.length; i++) {
                this.notifstudent[i] = await studentservice.getstudentbyid(this.notifs[i].studentid);
                this.notifproject[i] = await projectservice.getaproject(this.notifs[i].projectid);
            }

           // await this.updateNotifs(notifs);
            // for (let i = 0; i < notifs.length; i++) {
            //     this.notifstudent[i] = await studentservice.getstudentbyid(notifs[i].studentid);
            //     this.notifproject[i] = await projectservice.getaproject(notifs[i].projectid);
            // }
        }
    })
        this.socket.on('message',data=>{
            console.log(data);
        });
    },
    methods: {
        checkoutproject(index){
            this.$router.push('/project/'+this.getclosedprojects[index]._id);
        },
        showopenp(){
            this.showopen=!this.showopen;
           
        },
        showclosedp(){
            this.showclosed=!this.showclosed;
        },
        // async updateNotifs(notifs){
        //     for (let i = 0; i < notifs.length; i++) {
        //         this.notifstudent[i] =await studentservice.getstudentbyid(notifs[i].studentid);
        //         this.notifproject[i] =await projectservice.getaproject(notifs[i].projectid);
        //     }
        // },
        showcreateprojectbox(){
            this.showcreateproject = true;
            document.getElementsByClassName("create-project")[0].classList.toggle("show");
        },
        logout(){
            localStorage.removeItem('professortoken');
            this.$router.push('/professorloginpage');
        },
        async shownotifs(){
            this.showNotifs=!this.showNotifs;
        },
        showeditform(ind){
            this.showedit=!this.showedit;
            this.editindex = ind;
            // document.getElementsByClassName("edit-project-container")[0].classList.toggle("show");
          
        },
        async deleteproject(index) {
            try {
                await projectservice.deleteproject(this.projects[index]._id);
                this.projects.splice(index, 1);
            } catch (err) {
                this.error = err;
            }
            await profservice.updateprof(this.prof._id, this.prof.name, this.prof.email, this.prof.department, this.projects, this.prof.notifs);
        },
        async updateproject(e)
         {
            e.preventDefault()
            try {
                const index=this.editindex;
                this.projects[index].title = this.edittitle;
                this.projects[index].description = this.editdescription;
                this.projects[index].number = this.editnumber;
                this.projects[index].status = this.editstatus;
                this.projects[index].department = this.editdepartment;
                this.projects[index].skills = this.editskills;
                this.projects[index].deliverables = this.editdeliverables;
                this.projects[index].evaluationstatus = this.editevaluationstatus;

                console.log(this.projects[index]);
                console.log(this.edittitle);
             
                // id, title, description, number, department, status, professor, students, skills, evaluationstatus, duration
                await projectservice.updateproject(this.projects[index]._id, this.projects[index].title, this.projects[index].description, this.projects[index].number, this.projects[index].department, this.projects[index].status, this.projects[index].professor, this.projects[index].students, this.projects[index].skills, this.projects[index].evaluationstatus, this.projects[index].deliverables);
                this.projects = await allprojectservice.getprojectsbyprof(this.profid);
                this.showedit = false;
            } catch (err) {
                this.error = err;
            }

        },
        viewStudent(ind){
            this.$router.push('/student/'+this.notifstudent[ind]._id);
        },
       async acceptstudent(ind){
            this.notifproject[ind].number=this.notifproject[ind].number-1;
            this.notifproject[ind].students.push(this.notifstudent[ind]._id);
            this.prof.notifs.splice(ind,1);
           this.notifs = this.prof.notifs;
            await  profservice.updateprof(this.prof._id, this.prof.name, this.prof.email, this.prof.department, this.prof.projects,this.prof.notifs);
            
            if(this.notifproject[ind].number==0){
                this.notifproject[ind].status=false;
            }
            await projectservice.updateproject(this.notifproject[ind]._id, this.notifproject[ind].title, this.notifproject[ind].description, this.notifproject[ind].number, this.notifproject[ind].department, this.notifproject[ind].status,this.notifproject[ind].professor,this.notifproject[ind].students,this.notifproject[ind].skills,this.notifproject[ind].evaluationstatus,this.notifproject[ind].deliverables);
            this.notifstudent[ind].project=this.notifproject[ind]._id;
            this.notifstudent[ind].requestsstatus="accepted";
            this.notifstudent[ind].notifs={"projectid": this.notifproject[ind]._id,"message":"accepted"};
            //this.notifstudent[ind].notifs.message="accepted";
           await studentservice.updatestudent(this.notifstudent[ind]._id, this.notifstudent[ind].name, this.notifstudent[ind].department, this.notifstudent[ind].email, this.notifstudent[ind].project,this.notifstudent[ind].requestsstatus,this.notifstudent[ind].notifs,this.notifstudent[ind].skills,this.notifstudent[ind].rejected);
           
            this.projects = await allprojectservice.getprojectsbyprof(this.profid);
            this.socket.emit("acceptstudent",this.notifstudent[ind].requestsstatus,this.notifstudent[ind].notifs,this.notifstudent[ind].project,this.notifproject[ind].title,this.notifproject[ind].description,this.notifproject[ind].department,this.notifstudent[ind]._id);
        },
        async rejectstudent(ind){
            this.notifstudent[ind].requestsstatus="rejected";
            // this.notifstudent[ind].notifs.projectid=this.notifproject[ind]._id;
            // this.notifstudent[ind].notifs.message="rejected";
            this.prof.notifs.splice(ind, 1);
            this.notifs = this.prof.notifs;
            this.notifstudent[ind].notifs = { "projectid": this.notifproject[ind]._id, "message": "rejected" };
            console.log("the notifs of the rejected student is ",this.notifstudent[ind].notifs);
            this.notifstudent[ind].rejected.push(this.notifproject[ind]._id);
            await studentservice.updatestudent(this.notifstudent[ind]._id, this.notifstudent[ind].name, this.notifstudent[ind].department, this.notifstudent[ind].email, this.notifstudent[ind].project, this.notifstudent[ind].requestsstatus, this.notifstudent[ind].notifs, this.notifstudent[ind].skills, this.notifstudent[ind].rejected);
           
            await profservice.updateprof(this.prof._id, this.prof.name, this.prof.email, this.prof.department, this.prof.projects, this.prof.notifs);
            this.socket.emit("rejectstudent", this.notifstudent[ind].requestsstatus, this.notifstudent[ind].notifs, this.notifstudent[ind]._id, this.notifproject[ind].title, this.notifproject[ind].description, this.notifproject[ind].department);
        },
      async addproject(e){
        e.preventDefault();
        await projectservice.insertproject(this.title,this.description,this.status,this.number,this.department,this.skills,this.profid,this.deliverables,this.evaluationstatus).then(async(res)=>{
            this.title="";
            this.description="";
            this.status=true;
            this.number=1;
            this.department="";
            this.skills=[];
            this.deliverables=[];
            this.evaluationstatus="notEvaluated";
            this.prof.projects.push(res.data._id);
            await profservice.updateprof(this.prof._id, this.prof.name, this.prof.email, this.prof.department, this.prof.projects, this.prof.notifs).then(
                async(ress)=>{
                    console.log("updated the prof sucessfully",ress.data);
                    this.projects = await allprojectservice.getprojectsbyprof(this.profid);
                    console.log("the projects are ",this.projects);
                    document.getElementsByClassName("create-project")[0].classList.toggle("show");
                }
            );
        },(err)=>{
            console.log(err);
        });

        }
    }
}
</script>
<style>
@import "../assets/professorpage.css";
:root {
    --blue: #00ADB5;
    --white: #EEEEEE;
}

div.container {
    max-width: 800px;
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.project-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
}

.project-card {
    width: 350px;
    height: 360px;
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
    height: 40px;
    border-radius: 10px;
    background-color: var(--blue);
    color: var(--white);
    font-size: 20px;
    margin: 10px;
}


p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
}
.sidepanel{
    width: 20vw;
    height: 100vh;
    position:absolute;
    background-color: #f1f1f1;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    z-index: 1;
    overflow-x: hidden;
    overflow-y:scroll ;
}
.notif{
   color:var(--white);
    background-color: #bababa;
    border-radius: 10px;
    padding: 10px;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.notif button{
    background-color: var(--blue);
    color: var(--white);
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
  
}
.allprojects{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height:400vh;
    align-items: center;
    background-color:var(--blue);
    width:60vw;
}
.projectsOC{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-height:400vh;
    align-items:flex-start;
    background-color:var(--blue);
    padding:20px;
}
.openclosebuttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    background-color:var(--blue);
    width:100%;
    padding:20px;
    color:#00ADB5;

}
.openclosebuttons button{
    background-color: #EEEEEE;
    border: none;
    color: #00ADB5;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius:10px ;
    transition: all 0.3s ease 0s;
}
.openclosebuttons button:hover{
    background-color: #066d72;
    color:#EEEEEE;
}

</style>