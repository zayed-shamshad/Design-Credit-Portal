<template>
    <q-ajax-bar/>
     <q-layout>
        <q-header reveal class="bg-black">
        <q-toolbar>
            <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
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
                  
                    <q-item clickable v-ripple @click="routetodept()">
                        <q-item-section avatar>
                            <q-icon name="square">
                               
                            </q-icon>
                        </q-item-section>
                        <q-item-section>
                            departments
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

        <q-page-container>
            <q-page>
                <router-view v-slot="{ Component, route }">
                    <component :is="Component" v-if="route.name=='myproject'" v-bind:myproject="prop1" >
                        </component>
                    <component :is="Component" v-else>
                    </component>
                </router-view>
            </q-page>
        </q-page-container>
    </q-layout>
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
            prop1:{
                title: 'sdasd',
                description: 'sdasd',
                department: 'sdad',
                deliverables: ['sadasd','ssd','sdasd'],
                professor: 'sdasdsd',
            },
            drawerLeft: false,
            socket:null,
            showNotifs: false,
            notifs:null,
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
        routetodept(){
            this.$router.push({ name: 'alldepartment'})
        }
    }
}
</script>
<style scoped>
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