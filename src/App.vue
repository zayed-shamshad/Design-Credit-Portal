<template>
 
      <router-link to="/studentloginpage">Student Login</router-link>
      <router-link to="/professorloginpage">Professor Login</router-link>
      <router-view></router-view>

</template>

<script>
export default {
  name: 'App',
  data: () => ({
    
  }),
}
</script>
