import { createRouter, createWebHistory } from 'vue-router'
import student from '../views/student.vue'
import {studentStore} from '../stores/student.js'
import home from '../views/home.vue'
import axios from 'axios'
import ProjectService from '../services/getprojectservice'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: home,
    },

    {
      path: '/studentPage',
      name: 'student',
      component: student,
      beforeEnter:async (to, from, next) => {
               const studentstore=studentStore();
             try {
                   const { data } = await axios.get("http://localhost:5000/studentregister/user", {
                     headers: {
                       studenttoken: localStorage.getItem("studenttoken"),
                     },
                   });

                   if(data.student.project){
                    
                    const res=await ProjectService.getAProject(data.student.project);
                    console.log(res)
                     const student = {
                       id: data.student._id,
                       name: data.student.name,
                       email: data.student.email,
                       department: data.student.department,
                       skills: data.student.skills,
                       requestsstatus: data.student.requestsstatus,
                       myproject: res,
                       project: data.student.project,
                       notifs: data.student.notifs,
                       rejected: data.student.rejected,
                     }
                     studentstore.setStudent(student);
                    }
                    else{
                      const student = {
                        id: data.student._id,
                        name: data.student.name,
                        email: data.student.email,
                        department: data.student.department,
                        skills: data.student.skills,
                        requestsstatus: data.student.requestsstatus,
                        myproject: null,
                        project: data.student.project,
                        notifs: data.student.notifs,
                        rejected: data.student.rejected,
                      }
                      studentstore.setStudent(student);
                    }
                   next();
                 } catch (error) {
                  console.log(error)
                   next(false);
                 }
                },
      redirect: { name: 'home' },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../components/studenthome.vue'),
          props: true
        },
        {
          path: 'departments',
          name: 'alldepartment',
          component: () => import('../components/alldepartments.vue'),
        },
        {
          path: 'departments/:dept',
          name: 'department',
          component: () => import('../views/department.vue'),
          props: true
        }
      ]

    },
    {
      path: '/professorPage',
      name: 'professor',
      component: () => import('../views/professor.vue'),
    }
    ,
    {
          path: '/project/:id',
          name: 'projectDetails',
          component: () => import('../components/projectDetails.vue'),
          props: true,
    },

    {
      path: '/studentloginpage',
      name: 'studentloginpage',
      component: () => import('../views/studentloginpage.vue'),
      props: true
    }
    ,
    {
      path: '/professorloginpage',
      name: 'professorloginpage',
      component: () => import('../views/professorloginpage.vue'),
      props: true
    },
    {
      path: '/professorregisterpage',
      name: 'professorregisterpage',
      component: () => import('../views/professorregisterpage.vue'),
      props: true
    },
    {
      path: '/studentregisterpage',
      name: 'studentregisterpage',
      component: () => import('../views/studentregisterpage.vue'),
      props: true
    }

  ]
})
router.beforeEach((to, from) => {
  const studenttoken = localStorage.getItem('studenttoken')
  const professorToken = localStorage.getItem('professortoken')
  
  if(to.name === 'studentloginpage' && studenttoken){
    return { name: 'student' }
  }
  if(to.name === 'professorloginpage' && professorToken){
    return { name: 'professor' }
  }
  if(to.name === 'studentregisterpage' && studenttoken){
    return { name: 'student' }
  }
  if(to.name === 'professorregisterpage' && professorToken){
    return { name: 'professor' }
  }
  if (to.name === 'student' && !studenttoken) {
    alert('You must be logged in to view this page');
    return { name: 'studentloginpage' }
  }
  if (to.name === 'professor' && !professorToken) {
    alert('You must be logged in to view this page');
    return { name: 'professorloginpage' }
  }
  if (to.name === 'department' && !studenttoken && !professorToken) {
    alert('You must be logged in to view this page');
    return { name: 'home' }
  }
  if (to.name === 'studentprofile' && !professorToken) {
    alert('You must be logged in to view this page');
    return { name: 'professorloginpage' }
  }
});

export default router
