<!-- <template>
      <q-card class="project-card" v-if="project!=null">
              <q-card-section>
                <div class="project-title text-center">
                  <strong class="title-text">{{ project.title }}</strong>
                </div>
                  
                <div class="project-department text-center"><strong>Department: </strong>{{ project.department }}</div>
                 
                <div class="project-description"> <strong>Description: </strong>{{ project.description }}</div>
                <div class="project-info-item">
                  <strong>Deliverables:</strong>
                  <ul>
                    <li v-for="(deliverable,ind) in project.deliverables" :key="deliverable">{{ deliverable.title }}: 
                        <q-checkbox v-model="newdeliverables[ind]" color="primary" label="status" />
                    </li>
                  </ul>
                  <q-btn color="primary" @click="updateDeliverables">Update</q-btn>

                </div>
                <div class="project-info-item">
                  <strong>Skills:</strong> {{ project.skills.join(', ') }}
                </div>
                <div>
                  <strong>Number of students required:</strong> {{ project.number }}

                </div>
              </q-card-section>
                <q-card-section v-if="students">
                    <div class="project-info-item">
                        <strong>Students:</strong>
                        <ul v-for="(student,index) in students" :key="student">
                           {{ index+1 }}:
                            <li >{{ student.name }}</li>
                            <li>{{ student.email }}</li>
                            <li>{{ student.department }}</li>
                            <li>{{ student.skills.join(', ') }}</li>

                        </ul>
                    </div>
                </q-card-section>

            </q-card>

            <q-card v-else>
                Loading...

            </q-card>
</template> -->
<template>
  <div class="project-card-container" v-if="project != null">
  <q-card class="project-card" v-if="project != null">
    <q-card-section>
      <div class="project-title text-center">
        <strong class="title-text">{{ project.title }}</strong>
      </div>

      <div class="project-department text-center">
        <strong>Department: </strong>{{ project.department }}
      </div>

      <div class="project-description">
        <strong>Description: </strong>{{ project.description }}
      </div>
    
      <div class="project-info-item">
        <strong>Deliverables:</strong>
        <ul>
          <li v-for="(deliverable, ind) in project.deliverables" :key="deliverable">
            <div class="deliverable-item">
              <span>{{ deliverable.title }}:</span>
              <q-checkbox v-model="newdeliverables[ind]" color="primary" label="Status" />
            </div>
          </li>
        </ul>
        <q-select
        v-model="evaluationstatus"
        :options="options"
        label="Evaluation Status"
        class="q-mb-md"
        transition-show="flip-up"
        hide-dropdown-icon
        transition-hide="flip-down"
        options-cover
        menu-offset="[100,100]"
      >

      </q-select>
        <q-btn color="primary" @click="updateDeliverables">Update</q-btn>
      </div>

      <div class="project-info-item">
        <strong>Skills:</strong> {{ project.skills.join(', ') }}
      </div>

      <div class="project-info-item">
        <strong>Number of students required:</strong> {{ project.number }}
      </div>
    </q-card-section>

    <q-card-section v-if="students">
      <div class="project-info-item">
        <strong>Students:</strong>
        <ul v-for="(student, index) in students" :key="student">
          <li>{{ index + 1 }}:</li>
          <li>{{ student.name }}</li>
          <li>{{ student.email }}</li>
          <li>{{ student.department }}</li>
          <li>{{ student.skills.join(', ') }}</li>
        </ul>
      </div>
    </q-card-section>
  </q-card>

  <q-card v-else>
    Loading...
  </q-card>
  </div>
</template>



<script setup>

import { ref} from "vue";
import ProjectService from "../services/getprojectservice";
import {useRoute} from 'vue-router';
import StudentService from "../services/getstudent";
import {watch } from 'vue';
import {Notify} from "quasar";
const route=useRoute();
 
const id=route.params.id;
const project=ref(null);
const newdeliverables=ref([]);
const students=ref([]);
const evaluationstatus=ref("");
const options=[
  "not evaluated",
  "evaluated",
]
projectData();

async function projectData(){
    project.value=await ProjectService.getAProject(id);
    evaluationstatus.value=project.value.evaluationstatus;
    newdeliverables.value=project.value.deliverables.map((deliverable)=>{
        return deliverable.completed;
    })
    console.log(newdeliverables.value)
    project.value.students.forEach(async(student)=>{
        const data=await StudentService.getStudentById(student);
        students.value.push(data);
    })
}

async function updateDeliverables(){
    const updateproject={
        ...project.value,
        evaluationstatus: evaluationstatus.value,
        deliverables:project.value.deliverables.map((deliverable,index)=>{
            return {
                ...deliverable,
                completed:newdeliverables.value[index]
            }
        })
    }
    await ProjectService.updateProject(updateproject);
    Notify.create({
        message: "Deliverables updated",
        color: "positive",
        icon: "cloud_done",
      });
}
watch(() => newdeliverables.value, (newVal, oldVal) => {
  console.log(newVal);
  console.log(oldVal);
}, { deep: true });

</script>


<style scoped>
.project-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the container height to match the viewport height */
}

.project-card {
  max-width: 600px; /* Adjust the width as needed */
  max-height: calc(100vh - 40px); /* Set the max height to viewport height minus any additional margins/padding */
  overflow-y: auto; /* Enable vertical scrolling for overflowing content */
  padding: 20px;
  width: 100%;
}

.title-text {
  font-size: 1.5rem;
}

.project-title {
  margin-bottom: 10px;
}

.project-department {
  margin-bottom: 20px;
}

.project-description {
  margin-bottom: 20px;
}

.project-info-item {
  margin-bottom: 20px;
}

.deliverable-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.deliverable-item span {
  flex-grow: 1;
  margin-right: 10px;
}
</style>