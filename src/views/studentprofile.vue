<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">student profile</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-h6">{{ email }}</div>
      <div class="text-h6">{{ department }}</div>
      <div class="text-h6" v-for="skill in skills" :key="skill">
        {{ skill }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import studentservice from "../services/getstudent";
export default {
  name: "studentprofile",
  data() {
    return {
      name: "",
      email: "",
      department: "",
      skills: [],
      error: null,
    };
  },
  async created() {
    try {
      const student = await studentservice.getstudentbyid(
        this.$route.params.student
      );
      console.log(student);
      this.name = student.name;
      this.email = student.email;
      this.department = student.department;
      this.skills = student.skills;
    } catch (err) {
      this.error = err;
    }
  },
};
</script>

<style></style>
