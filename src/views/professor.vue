<template>
    <q-ajax-bar color="primary" />
    <q-layout>
        <q-header>
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="opendrawer=!opendrawer"/>
                <q-btn @click="showcreateproject=true" flat v-ripple>
                    <q-icon name="add" />
                </q-btn>
                
                <q-toolbar-title>
                    portal
                </q-toolbar-title>
               
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page padding>
                            <div v-if="showopen"
                                class="department-container row">
                                    <div class="row justify-center q-gutter-sm">
                                        <div v-for="(project, index) in  getopenprojects" :item="project" :index="index" :key="project._id"
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
            </q-page>
        </q-page-container>

        <q-drawer v-model="opendrawer"
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
                <q-form @submit="addproject" @reset="reset">
                        <q-input type="text"  v-model="title" placeholder="add title" required/>
                        <q-input type="text"  v-model="description" placeholder="add description" required/>
                        <q-input type="number"  v-model="number" placeholder="add number of students" required/>
                        <q-select v-model="departmentproject" bottom end :options="departments" transition-show="flip-up" hide-dropdown-icon
                            transition-hide="flip-down" options-cover menu-offset=[100,100] label="Department" />
                        <q-select label="deliverables" filled v-model="deliverables" use-input use-chips multiple hide-dropdown-icon
                            input-debounce="0" new-value-mode="add-unique" style="width: 250px" />
                        <q-select label="skills required" filled v-model="skills" multiple :options="options" counter max-values="5" hint="Max 5 selections"
                            use-chips use-input />
                        <div>
                            <q-btn type="submit" label="submit" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                </q-form>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>

        </q-dialog>

        <q-dialog v-model="showedit">
            <q-card>
                <q-card-section class="row items-center">
                    
                <q-form @submit="updateproject" @reset="resetedit">
                        <q-input type="text" v-model="edittitle" required />
                        <q-input type="text" v-model="editdescription"  required />
                        <q-input type="number" v-model="editnumber"  required />
                        <q-select label="deliverables" filled v-model="editdeliverables" use-input use-chips multiple hide-dropdown-icon
                            input-debounce="0" new-value-mode="add-unique" style="width: 250px" />
                        <q-select :options="statusproject" v-model="editevaluationstatus" label="project evaluation" />
                        <q-select v-model="editdepartment" bottom end :options="departments" transition-show="flip-up" hide-dropdown-icon
                        transition-hide="flip-down" options-cover menu-offset=[100,100] label="Department" />
                        <q-select label="skills required" filled v-model="editskills" multiple :options="options" counter max-values="5"
                            hint="Max 5 selections" use-chips use-input />
                        <div>
                            <q-btn type="submit" label="submit" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                </q-form>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showNotifs" class="col justify-center">
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

            <q-card v-else class="col items-center justify-center" style="max-width: 500px;">
                <q-card class="flex items-center justify-between align-center" elevated>
                    <q-card-section>
                       Name
                    </q-card-section>
                    <q-card-section>
                       Department
                    </q-card-section>
                    <q-card-section>
                       Project Title
                    </q-card-section>
                </q-card>
                    <q-card class="flex items-center justify-between align-center" elevated v-for="(notification,ind) in notifs" :key="ind" :value="notification">
                         <q-card-section>
                            {{notifstudent[ind].name}}
                         </q-card-section>  
                        <q-card-section>
                         {{notifstudent[ind].department}}
                        </q-card-section>
                        <q-card-section>
                         {{notifproject[ind].title}}
                        </q-card-section>
                        <q-card-action>
                            <q-btn @click="viewStudent(ind)">
                                view
                            </q-btn>
                        </q-card-action>
                    </q-card>
                <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card>

           
                
        </q-dialog>

    </q-layout>
</template>

<script>

import io from "socket.io-client";
import axios from 'axios';
import allprojectservice from '../services/getallprojects'
import projectservice from '../services/getprojectservice'
import profservice from '../services/getprofs'
import studentservice from '../services/getstudent'
export default {
    name: 'professor',
    data() {
        return {
            statusproject:[
                "notEvaluated",
                "Evaluated",
                "pending"
            ],
            departmentproject: "",
            departments:[
                "CSE",
                "EE",
                "ME",
                "CH",
                "BB",
                "AI",
                "CI",
                "MT",
            ],
            options: [
                    "web development",
                    "app development",
                    "machine learning",
                    "data science",
                    "blockchain",
                    "cloud computing",
                    "cyber security",
                    "networking",
                    "embedded systems",
                    "robotics",
                    "iot",
                    "digital marketing",
                    "ui/ux",
                    "game development",
                    "cyber security",
                    "networking",
                    "embedded systems",
                    "robotics",
                    "iot",
                    "Vue.js",
                    "React.js",
                    "Angular.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "MySQL",
                    "Python",
                    "Java",
                    "C++",
                    "C",
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "PHP",
                    "Ruby",
                    "Swift",
                    "Kotlin",
                    "flutter",
                    "Django",
                    "Laravel",
                    "Spring",
                    "ASP.NET",
                    "flask",
                    "Ruby on Rails",
                    "Bootstrap",
                    "Materialize",
                    "Tailwind",
                    "Sass",
                    "Less",
                    "jQuery",
                    "React Native",
                    "Ionic",
                    "Android",
                    "iOS",
                    "Firebase",
                    "AWS",
                    "Azure",
                    "GCP",
                    "Heroku",
                    "Netlify",
                    "Digital Ocean",
                    "Vercel",
                    "Github",
                    "Gitlab",
                    "Bitbucket",
                    "Jira",
                    "Trello",
                    "Agile",
                    "Scrum",
                    "Kanban",
        ],

            opendrawer: false,

            showopen:true,
            showclosed:true,

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
            editevaluationstatus: "",
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
            const prof= await profservice.getprofbytoken();
            this.profid=prof.prof._id;
            this.name = prof.prof.name;
            this.department = prof.prof.department;
            this.email = prof.prof.email;
            this.projects = await allprojectservice.getprojectsbyprof(this.profid);
            this.prof = await profservice.getprofbyid(this.profid);
            this.notifs = this.prof.notifs;
            for (let i = 0; i < this.notifs.length; i++) {
                this.notifstudent[i] = await studentservice.getstudentbyid(this.notifs[i].studentid);
                this.notifproject[i] = await projectservice.getaproject(this.notifs[i].projectid);
            }
    },
   mounted(){
    this.socket.on('studentapplied',async (studentid,profid,projectid) => {
        console.log("recieved the application in professor")
        if(this.profid==profid){
            const student=await studentservice.getstudentbyid(studentid);
            const project= await projectservice.getaproject(projectid);
            this.notifstudent.push(student);
            this.notifproject.push(project);
            this.notifs.push({studentid:studentid,projectid:projectid});

        }
    })
        this.socket.on('profid',data=>{
            console.log(data);
        });
    },
    methods: {
        resetedit(){
            this.edittitle = '';
            this.editdescription = '';
            this.editnumber = 0;
            this.editstatus = true;
            this.editdepartment = '';
            this.editskills = [];
            this.editdeliverables=[];
            this.editevaluationstatus = "notEvaluated";
        },
        reset(){
            this.title = '';
            this.description = '';
            this.number = 0;
            this.status = true;
            this.departmentproject = '';
            this.students = [];
            this.skills = [];
            this.deliverables = [];
            this.evaluationstatus = "notEvaluated";
        },
        checkoutproject(index){
            this.$router.push('/project/'+this.getclosedprojects[index]._id);
        },

        showopenp(){
            this.showopen=!this.showopen;
            
        },
        showclosedp(){
            this.showclosed=!this.showclosed;
        },
        showcreateprojectbox(){
            this.showcreateproject = true;
        },
        logout(){
            localStorage.removeItem('professortoken');
            this.$router.replace('/professorloginpage');
        },

        showeditform(ind){
            this.showedit=true;
            this.editindex = ind;
            this.edittitle = this.projects[ind].title;
            this.editdescription = this.projects[ind].description;
            this.editnumber = this.projects[ind].number;
            this.editstatus = this.projects[ind].status;
            this.editdepartment = this.projects[ind].department;
            this.editskills = this.projects[ind].skills;
            this.editdeliverables = this.projects[ind].deliverables;
            this.editevaluationstatus = this.projects[ind].evaluationstatus;
        },
        async deleteproject(index) {
            try {
                await projectservice.deleteproject(this.projects[index]._id);
                this.projects.splice(index, 1);
            } catch (err) {
                this.error = err;
            }
            let updatedprof={
                id:this.prof._id,
                name:this.prof.name,
                email: this.prof.email,
                department:this.prof.department,
                projects: this.projects,
                notifs: this.prof.notifs
            }
            await profservice.updateprof(updatedprof);
        },
        async updateproject()
         {
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
                await projectservice.updateproject({id:this.projects[index]._id,
                    title: this.projects[index].title,
                    description: this.projects[index].description,
                    number: this.projects[index].number,
                    department:this.projects[index].department,
                    status:this.projects[index].status,
                    professor: this.projects[index].professor,
                    students: this.projects[index].students,
                    skills: this.projects[index].skills,
                    evaluationstatus: this.projects[index].evaluationstatus,
                    deliverables: this.projects[index].deliverables
                });
                this.projects = await allprojectservice.getprojectsbyprof(this.profid);
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
            await profservice.updateprof({
                id:this.prof._id,
                notifs:this.prof.notifs
            });
            if(this.notifproject[ind].number==0){
                this.notifproject[ind].status=false;
            }
           await projectservice.updateproject({
               id: this.notifproject[ind]._id,
               number: this.notifproject[ind].number,
               status: this.notifproject[ind].status,
               students: this.notifproject[ind].students,
           });
            this.notifstudent[ind].project=this.notifproject[ind]._id;
            this.notifstudent[ind].requestsstatus="accepted";
            this.notifstudent[ind].notifs={"projectid": this.notifproject[ind]._id,"message":"accepted"};
            //this.notifstudent[ind].notifs.message="accepted";
           await studentservice.updatestudent({
            id:this.notifstudent[ind]._id,
            project:this.notifstudent[ind].project,
            requeststatus:this.notifstudent[ind].requestsstatus,
            notifs: this.notifstudent[ind].notifs
            });
            this.projects = await allprojectservice.getprojectsbyprof(this.profid);
            this.socket.emit("acceptstudent",this.notifstudent[ind].project,this.notifstudent[ind]._id);
        },
        async rejectstudent(ind){
            this.notifstudent[ind].requestsstatus="rejected";
            this.prof.notifs.splice(ind, 1);
            this.notifs = this.prof.notifs;
            this.notifstudent[ind].notifs = { "projectid": this.notifproject[ind]._id, "message": "rejected" };
            this.notifstudent[ind].rejected.push(this.notifproject[ind]._id);
            await studentservice.updatestudent({
                id:this.notifstudent[ind]._id,
                requeststatus:this.notifstudent[ind].requestsstatus,
                notifs: this.notifstudent[ind].notifs,
                rejected: this.notifstudent[ind].rejected});
           
            await profservice.updateprof({id:this.prof._id,notifs: this.prof.notifs});
            this.socket.emit("rejectstudent", this.notifproject[ind]._id,this.notifstudent[ind]._id);
        },
      async addproject(){
          await projectservice.insertproject({
            title:this.title,
            description: this.description,
            status: this.status,
            number:this.number,
            department: this.departmentproject,
            skills:this.skills,
            professor:this.profid,
            deliverables:this.deliverables,
        }).then(async res=>{
            this.title="";
            this.description="";
            this.status=true;
            this.number=1;
            this.departmentproject ="";
            this.skills=[];
            this.deliverables=[];
            this.evaluationstatus="notEvaluated";
            this.prof.projects.push(res.data._id);
            await profservice.updateprof({ id: this.prof._id, projects: this.prof.projects })
            this.projects = await allprojectservice.getprojectsbyprof(this.profid);
        });
         
        }
    }
}
</script>