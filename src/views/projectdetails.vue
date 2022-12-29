<template>
  <div class="projectdetails">
    <div class="projectdetailsinside">
      <div>
        project title:
        {{ project.title }}
      </div>
      <div>
        project description:

        {{ project.description }}
      </div>
      <div>
        project department:
        {{ project.department }}
      </div>
      <div>
        project deliverables
        {{ project.deliverables[0] }},

        {{ project.deliverables[1] }},
        {{ project.deliverables[2] }}
      </div>
      <div>
        project professor:
        {{ project.professor }}
      </div>
      <div>
        students:
        <div v-for="i in project.students" :key="i">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectservice from "../getprojectservice";
export default {
  name: "project",
  data() {
    return {
      id: "",
      projecttitle: "",
      projectdescription: "",
      projectdepartment: "",
      projectdeliverables: [],
      projectstudents: [],
      project: null,
    };
  },
  async created() {
    this.id = this.$route.params.id;
    try {
      this.project = await projectservice.getaproject(this.$route.params.id);
    } catch (err) {
      this.error = err;
    }
  },
};
</script>

<style></style>
