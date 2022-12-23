<template>
    <div class="department-container row">
        <div class="q-pa-md">
            <div class="row justify-center q-gutter-sm">
                <div v-for="(project,ind) in getopenprojects" :key="project._id" :value="ind"
                    class="q-pa-sm flex flex-center relative-position example-item">
                    <transition name="q-transition--scale">
                        <q-card>
                            <q-card-section>
                                <div>{{project.title }}</div>
                                <div>{{ project.description }}</div>
                                <div>{{ project.department }}</div>
                                <button @click="apply(ind)">
                                    apply
                                </button>
                            </q-card-section>
                        </q-card>
                    </transition>
                </div>
            </div>
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
              await profservice.getprofbyid(response.professor).then(
                    async (res)=>{
                      res.notifs.push({ studentid: this.student, projectid: this.projects[ind]._id });
                      await profservice.updateprof({ id: res._id, notifs: res.notifs });
                      this.requestsstatus = 'pending';
                      await studentservice.updatestudent({ id: this.student, requestsstatus: this.requestsstatus})
                      this.socket.emit('studentapply', this.student, res._id, response._id, this.socket.id);
                    }).finally(()=>{
                        alert("applied for the project successfully ");
                    })
                });
        }
    }
}
</script>
<style>

</style>