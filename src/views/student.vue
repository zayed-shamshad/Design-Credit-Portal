<template>
    <q-ajax-bar/>
     <q-layout>
        <q-header reveal class="bg-black">
        <q-toolbar>
            <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
        </q-toolbar>


        </q-header>
        <q-footer>
            <q-toolbar>
                <q-toolbar-title>Footer</q-toolbar-title>
            </q-toolbar>
        </q-footer>

        <q-drawer v-model="drawerLeft" :width="300" :breakpoint="400" overlay elevated >
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple @click="showNotifs=true">
                        <q-item-section avatar>
                            <q-icon name="message">
                            <q-badge floating color="red" rounded />
                            </q-icon>
                        </q-item-section>
                        <q-item-section>
                            Inbox
                        </q-item-section>
                    </q-item>
        
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="star" />
                        </q-item-section>
        
                        <q-item-section>
                            Star
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
                </q-list>
            </q-scroll-area>
        
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <div class="text-weight-bold">user</div>
                    <div>@user</div>
                </div>
            </q-img>
        </q-drawer>
        <q-dialog v-model="showNotifs">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Alert</div>
                </q-card-section>
        
                <q-card-section class="q-pt-none">
                    there are no notifications
                </q-card-section>
        
                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- <q-dialog v-model="showNotifs">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Notification</div>
                </q-card-section>
               
                    <q-card-section v-if="notifproj">
                        <div class="text-h6">project title:
                        {{ notifproj }}</div>
                        <div class="text-h6">response:
                        {{notifs.message}}</div>
                        <button @click="remove()">clear notifs</button>
                    </q-card-section>
               
                        <q-card-section class="q-pt-none"  v-else>
                           no notifs
                        </q-card-section>
               
                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog> -->

        <q-page-container>
            <q-page>
                <div class="myproject-outside" v-if="requestsstatus=='accepted'">
                    <div v-if="requestsstatus=='accepted'" class="project-card">
                        <div class="q-pa-sm flex flex-center relative-position example-item">
                            <transition name="q-transition--scale">
                                <q-card>
                                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                                    <q-card-section>
                                        <div class="text-h6">{{cards[index]}}</div>
                                        Title:
                                        <h2>{{myproject.title }}</h2>
                                        Description:
                                        <p>{{ myproject.description }}</p>
                                        Department:
                                        <p>{{ myproject.department }}</p>
                                        Deliverable 1:
                                        <p>{{myproject.deliverables[0]}}</p>
                                        Deliverable 2:
                                        <p>{{myproject.deliverables[1]}}</p>
                                        Deliverable 3:
                                        <p>{{myproject.deliverables[2]}}</p>
                                        Professor:
                                        <p>{{myproject.professor}}</p>
                                    </q-card-section>
                                </q-card>
                            </transition>
                        </div>
                    </div>
                </div>
                <div v-if='requestsstatus == "notApplied" || requestsstatus == "pending" || requestsstatus=="rejected"'
                    class="department-container row">
                    <div class="q-pa-md">
                        <div class="row justify-center q-gutter-sm">
                            <div v-for="index in inView.length" :key="index" :data-id="index - 1"
                                class="q-pa-sm flex flex-center relative-position example-item" v-intersection="onIntersection">
                                <transition name="q-transition--scale">
                                    <q-card v-if="inView[index - 1]">
                                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                                        <q-card-section>
                                            <div class="text-h6">{{cards[index]}}</div>
                                            <q-btn class="text-subtitle2" v-on:click="routetodepartment(cards[index])">checkout</q-btn>
                                        </q-card-section>
                                    </q-card>
                                </transition>
                            </div>
                        </div>
                    </div>
                
                </div>

            </q-page>

        </q-page-container>
       


    </q-layout>
        <!-- <q-btn @click="shownotifs" v-ripple class="indigo-4">
            show notifications
        </q-btn>
        <q-btn @click="logout" v-ripple>
            logout
        </q-btn>
                <div class="sidepanel" v-if="showNotifs">
                    <div v-if="notifproj">
            <div>
                project title:
                {{ notifproj }}
            </div>
            <div>
                response:
                {{notifs.message}}
            </div>
            <div>
                <button @click="remove()">clear notifs</button>
            </div>
                    </div>
        <div v-else>
            <h3>
                no notifications
            </h3>

        </div>
               
    </div> -->

 
    <!-- <div v-for="i in cards" :key="i" class="department-card col wrap">
                
                <q-card>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                
                    <q-card-section>
                        <div class="text-h6">{{i}}</div>
                        <q-btn v-on:click="routetodepartment(i)" v-ripple color="indigo-4">
                           checkout
                        </q-btn>
                    </q-card-section>
                </q-card>
            </div> -->
    

  
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import projectservice from '../getprojectservice';
import studentservice from '../services/getstudent';
import profservice from '../services/getprofs';
export default {
    name: 'student',
    data() {
        return {
            drawerLeft: false,
            drawerRight: false,
            inView :[false,false,false,false,false,false,false,false,
        ]
            ,
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
                department: '',
                deliverables:[],
                professor:'',
            },
            skills:[],
            rejected:[],
            student: null,
            notifproj: "",

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
                    await projectservice.getaproject(response.data.student.project).then(async res => {
                        console.log(res);
                        this.myproject.title=res.title;
                        this.myproject.description=res.description;
                        this.myproject.department=res.department;
                        this.myproject.deliverables=res.deliverables;
                        await projectservice.getaproject(this.notifs.projectid).then(
                            ressss => {
                                this.notifproj = ressss.title;
                            }
                        )
                        await profservice.getprofbyid(res.professor).then(res => {
                            this.myproject.professor=res.name;
                        })
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
        onIntersection(entry) {
            const index = parseInt(entry.target.dataset.id, 10)
            console.log(index);
            setTimeout(() => {
                this.inView.splice(index, 1, entry.isIntersecting)
            }, 50)
        },
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
            this.$router.replace('/studentloginpage');
        },
        routetodepartment(dept){
            this.$router.push('/department/'+dept);
        },
    }
}
</script>
<style scoped>
.example-item{
  height: 400px;
  width: 400px;
}
.body {
        margin: 0;
        padding: 0;
    }

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        align-items: center;

        background-color: rgb(255, 255, 255);
        color: white;
        width: 100vw;
    }

    .navbar button {
        background-color: var(--blue);
        color: var(--white);
        border: none;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.3s ease;
        border-radius: 10px;
        margin: 20px;
    }

    .navbar button:hover {
        background-color: rgb(255, 255, 255);
        color: var(--blue);
        border: none;
        font-size: 20px;
        font-weight: bold;
    }

    :root {
        --blue: var(--blue);
        --white: #ffffff;
    }

    .myproject-outside {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--blue);
    }

    .department-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: row;
        background-color: var(--blue);
        width: 100vw;
    }

    .department-container button {
        background-color: var(--blue);
        color: var(--white);
        border: none;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.3s ease;
        border-radius: 10px;
    }

    .department-card {
        width: 400px;
        height: 400px;
        min-width: 300px;
        min-height: 300px;
        background-color: #f1f1f1;
        margin: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        flex-direction: column;
    }

    .project-card {
        width: 350px;

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
        background-color: var(--blue);
        display: flex;
        color: var(--white);
        flex-direction: column;
        justify-content: space-evenly;
        z-index: 1;
        overflow-x: hidden;
        overflow-y: scroll;
    }

</style>