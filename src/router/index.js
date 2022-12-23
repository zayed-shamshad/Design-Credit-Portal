import { createRouter, createWebHistory } from 'vue-router'
import student from '../views/student.vue'
import home from '../views/home.vue'
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
      children: [
        {
          path: 'departments',
          name: 'alldepartment',
          component: () => import('../views/alldepartments.vue'),
          props: true
        },
        {
          path: 'departments/:dept',
          name: 'department',
          component: () => import('../views/department.vue'),
          props: true
        },
        {
          path: 'profile',
          name: 'profilepage',
          component: () => import('../views/profilepage.vue'),
          props: true
        },
        {
          path: 'myproject',
          name: 'myproject',
          component: () => import('../views/myproject.vue'),
          props: true
        },
      ]
    },
    {
      path: '/professorPage',
      name: 'professor',
      component: () => import('../views/professor.vue'),
      children: [
        {
          path: 'profile',
          name: 'profilepage',
          component: () => import('../views/profilepage.vue'),
          props: true
        },
        {
          path: 'openprojects',
          name: 'openprojects',
          component: () => import('../views/openprojects.vue'),
          props: true
        },
        {
          path: 'closedprojects',
          name: 'closedprojects',
          component: () => import('../views/closedprojects.vue'),
          props: true
        },
      ]
    }
    ,
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/projectdetails.vue'),
      props: true
    },
    {
      path: '/student/:student',
      name: 'studentprofile',
      component: () => import('../views/studentprofile.vue'),
      props: true
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
