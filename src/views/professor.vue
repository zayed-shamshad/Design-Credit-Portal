<template>
    <q-ajax-bar color="primary" />
    <q-layout>
        <q-header>
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="opendrawer=!opendrawer"/>
                <q-btn @click="showcreateproject=true" v-ripple>
                    <q-icon name="add" />
                </q-btn>
                
                <q-toolbar-title>
                    portal
                </q-toolbar-title>
               
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page padding>
                <router-link to="/professor">professor</router-link>
                            <div v-if="showopen"
                                class="department-container row">
                                    <div class="row justify-center q-gutter-sm">
                                        <div v-for="(project, index) in  getopenprojects" :item="project" :index="index"
                                    :key="project._id"
                                            class="q-pa-md flex flex-center relative-position example-item">
                                            <transition name="q-transition--scale">
                                                <q-card>
                                                    <q-card-section>
                                                    <h3>{{ project.title }}</h3>
                                                    <p class="text">{{ project.description }}</p>
                                                    <p class="text">{{ project.number }}</p>
                                                   
                                                    <q-btn v-on:click="deleteproject(index)">Delete</q-btn>
                                                    <q-btn v-on:click="showeditform(index)">Edit</q-btn>
                                                    </q-card-section>
                                                </q-card>
                                            </transition>
                                        </div>
                                    </div>
                            </div>

                            <div v-if="showclosed" class="department-container row">
                                <div class="row justify-center q-gutter-sm">
                                    <div v-for="(project, index) in  getclosedprojects" :item="project" :index="index" :key="project._id"
                                        class="q-pa-md flex flex-center relative-position example-item">
                                    <transition name="q-transition--scale">
                                        <q-card>
                                            <q-card-section>
                                                <h3>{{ project.title }}</h3>
                                                <p class="text">{{ project.description }}</p>
                                                <p class="text">{{ project.number }}</p>
                                    
                                                <q-btn v-on:click="showeditform(index)">Edit </q-btn>
                                                <q-btn @click="checkoutproject(index)">checkout </q-btn>
                                            </q-card-section>
                                        </q-card>
                                    </transition>
                                  
                                </div>
                                </div>
                            </div>
                            <div v-else class="department-container row">
                                <div class="row justify-center q-gutter-sm">
                                    <div v-for="(project, index) in  projects" :item="project" :index="index" :key="project._id"
                                        class="q-pa-md flex flex-center relative-position example-item">
                                    <transition name="q-transition--scale">
                                        <q-card>
                                            <q-card-section>
                                                <h3>{{ project.title }}</h3>
                                                <p class="text">{{ project.description }}</p>
                                                <p class="text">{{ project.number }}</p>
                                    
                                                <q-btn v-on:click="showeditform(index)">Edit </q-btn>
                                                <q-btn @click="checkoutproject(index)">checkout </q-btn>
                                            </q-card-section>
                                        </q-card>
                                    </transition>
                                  
                                </div>
                                </div>

                            </div>


            </q-page>
        </q-page-container>

        <q-drawer  v-model="opendrawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
        overlay
        elevated
        >
        <q-scroll-area class="fit">

            <q-list>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                       home
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="logout">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>
                        Logout
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="showNotifs=true">
                    <q-item-section avatar>
                        <q-icon name="message" />
                    </q-item-section>
                    <q-item-section>
                        notifications
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="showedit=true">
                    <q-item-section avatar>
                        <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>
                        edit
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="showopenp">
                    <q-item-section avatar>
                        <q-icon name="laptop" />
                    </q-item-section>
                    <q-item-section>
                        open projects
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="showclosedp">
                    <q-item-section avatar>
                        <q-icon name="close" />
                    </q-item-section>
                    <q-item-section>
                        close projects
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>

        </q-drawer>

        <q-footer>

        </q-footer>

        <q-dialog v-model="showcreateproject">
            <q-card>
                <q-card-section class="row items-center">
                <form v-on:submit="addproject">
                    <q-list>
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
                    </q-list>
                </form>
                </q-card-section>
            
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
                
        </q-dialog>

        <q-dialog v-model="showedit">
            <q-card>
                <q-card-section class="row items-center">
                    
                <form v-on:submit="updateproject">
                    <q-list>
                        <input type="text" id="create-post" v-model="edittitle" :placeholder=projects[editindex].title>
                        <input type="text" id="create-post" v-model="editdescription" :placeholder=projects[editindex].description>
                        <label>change status of project </label>
                        <input type="checkbox" id="create-post" v-model="editstatus" :placeholder=projects[editindex].status>
                        <input type="number" id="create-post" v-model="editnumber" :placeholder=projects[editindex].number>
                        <input type="text" id="create-post" v-model="editdeliverables[0]"
                            :placeholder=projects[editindex].deliverables[0]>
                        <input type="text" id="create-post" v-model="editdeliverables[1]"
                            :placeholder=projects[editindex].deliverables[1]>
                        <input type="text" id="create-post" v-model="editdeliverables[2]"
                            :placeholder=projects[editindex].deliverables[2]>
                        <input type="text" id="create-post" v-model="editevaluationstatus"
                            :placeholder=projects[editindex].evaluationstatus>
                        <input type="text" id="create-post" v-model="editdepartment" :placeholder=projects[editindex].department>
                        <input type="text" id="create-post" v-model="editskills[0]" :placeholder=projects[editindex].skills[0]>
                        <input type="text" id="create-post" v-model="editskills[1]" :placeholder=projects[editindex].skills[1]>
                        <input type="text" id="create-post" v-model="editskills[2]" :placeholder=projects[editindex].skills[2]>
                        <button type="submit">
                            Save
                        </button>
                    </q-list>
                </form>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showNotifs" class="">
            <q-card v-if="notifs.length==0" >
                <q-card-section>
                    <div class="text-h6">Notifications</div>
                
                </q-card-section>
                <q-card-section class="q-pt-none">
                    no notifs

                </q-card-section>
                
                
               
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
            <q-card v-for="(notification,ind) in notifs" :key="ind" :value="notification">
                        <q-card-section class="row items-center">
                            Student Name:
                            {{notifstudent[ind].name}}
                            Department:
                            {{notifstudent[ind].department}}
                       
                            Project Title:
                            {{notifproject[ind].title}}
                            Project Description:
                            {{notifproject[ind].description}}
                            <q-btn @click="viewStudent(ind)">
                                view
                            </q-btn>
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn flat label="Cancel" color="primary" v-close-popup />
                        </q-card-actions>
            </q-card>
                
        </q-dialog>

    </q-layout>
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
            opendrawer: false,

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
            this.$router.replace('/professorloginpage');
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


</style>