<template>
  <div class="">
    <q-input
      v-model="searchText"
      filled
      dense
      placeholder="Search..."
      class="q-ma-md bg-white"
    />
  </div>
  <div class="department-container row">
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <div
          v-for="(project, ind) in filteredProjects"
          :key="project._id"
          class="q-pa-sm flex flex-center relative-position example-item"
        >
          <transition name="q-transition--scale">
            <q-card class="project-card">
              <q-card-section>
                <div class="project-title text-center">
                  <strong class="title-text">{{ project.title }}</strong>
                </div>
                  
                <div class="project-department text-center"><strong>Department: </strong>{{ project.department }}</div>
                 
                <div class="project-description"> <strong>Description: </strong>{{ project.description }}</div>
                <div class="project-info-item">
                  <strong>Deliverables:</strong>
                  <ul>
                    <li v-for="deliverable in project.deliverables" :key="deliverable">{{ deliverable.title }}</li>
                  </ul>
                </div>
                <div class="project-info-item">
                  <strong>Skills:</strong> {{ project.skills.join(', ') }}
                </div>
                <div>
                  <strong>Number of students required:</strong> {{ project.number }}

                </div>
                <div>
                  Request Status:
                  <div>
                    <div v-if="requestsstatus.find((request) => request.projectid === project._id) &&
                    rejected.indexOf(project._id) === -1">
                      Pending
                    </div>
                    <div v-else-if="rejected.indexOf(project._id)!=-1">
                      Rejected
                    </div>
                    <div v-else>
                      Not Applied
                    </div>
                </div>
                </div>
              
              </q-card-section>
              <q-card-actions
               v-if="
             !(requestsstatus.find((request) => request.projectid === project._id) ||
                    rejected.indexOf(project._id) !=-1
                    || !myproject)"
              >
                  <q-btn  
                  color="primary" class="apply-btn" @click="apply(project._id)">Apply</q-btn>
              </q-card-actions>
            </q-card>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from "vue";
import io from "socket.io-client";
import AllProjectService from "../services/getallprojects";
import StudentService from "../services/getstudent";
import { useRoute } from 'vue-router';
import { studentStore } from "../stores/student";



const route = useRoute();
const socket = ref(null);
const studentstore = studentStore();

const projects = ref([]);
const requestsstatus = ref([]);
const id = ref(null);
const rejected = ref([]);
const myproject= ref(null);
const searchText = ref("");


const filteredProjects= computed(() => {
      if (!searchText.value) {
        return getOpenProjects.value;
      }
      const searchTextLower = searchText.value.toLowerCase();
      return getOpenProjects.value.filter((project) =>{
        return project.title.toLowerCase().includes(searchTextLower) ||
        project.description.toLowerCase().includes(searchTextLower) ||
        project.skills.join(', ').toLowerCase().includes(searchTextLower)
      });
});


onMounted(async () => {
  socket.value = io("http://localhost:5000");
    projects.value = await AllProjectService.getProjectsByDept(route.params.dept);
    const student=studentstore.getStudent;
    requestsstatus.value = student.requestsstatus;
    rejected.value = student.rejected;
    id.value = student.id;
    myproject.value = student.project;
});

const getOpenProjects = computed(() => {
  return projects.value.filter((project) => {
    return project.status && project.number > 0
    //  && !rejected.value.includes(project._id);
  });
});

const apply = async (project_id) => {
  try {
    requestsstatus.value.push({
      projectid: project_id,
      status: true,
    });

    console.log("the request status are", requestsstatus.value)
    await StudentService.updateStudent({
      _id: id.value,
      requestsstatus: requestsstatus.value,
    });
    studentstore.setStudent({
      ...studentstore.getStudent,
      requestsstatus: requestsstatus.value,
    });
    const ind = projects.value.findIndex((project) => project._id === project_id);
    socket.value.emit("studentapply", id.value, projects.value[ind].professor, projects.value[ind]._id);
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
.title-text {
  font-size: 24px; /* Adjust the font size as per your preference */
}
/* Add custom styles for the component */
</style>
