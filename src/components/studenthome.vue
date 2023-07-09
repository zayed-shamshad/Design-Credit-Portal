<template>
  <div class="profile-container">
    <q-card class="profile-card">
      <q-card-section>
        <div class="card-heading">Student Profile</div>
        <div class="profile-details">
          <p><strong>Name:</strong> {{ studentDetails.name }}</p>
          <p><strong>Email:</strong> {{ studentDetails.email }}</p>
          <p><strong>Department:</strong> {{ studentDetails.department }}</p>
          <p><strong>Skills:</strong> {{ studentDetails.skills.join(", ") }}</p>
          <p><strong>Project:</strong> {{ studentDetails.project }}</p>
         
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div class="project-container" v-if="studentDetails.myproject">
    <q-card class="project-card">
      <q-card-section>
        <div class="card-heading">My Project</div>
        <div class="project-details">
          <p><strong>Title:</strong> {{ studentDetails.myproject.title }}</p>
          <p>
            <strong>Description:</strong>
            {{ studentDetails.myproject.description }}
          </p>
          <p>
            <strong>Department:</strong> {{ studentDetails.myproject.department }}
          </p>
          <p><strong>Deliverables:</strong></p>
          <ul>
            <li v-for="deliverable in studentDetails.myproject.deliverables" :key="deliverable">
              {{ deliverable.title }}
              :: {{ deliverable.completed ? "Completed" : "Not Completed" }}
            </li>
          </ul>
          <p><strong>Professor:</strong> {{ studentDetails.myproject.professor }}</p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>


<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.profile-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f2f2f2;
}

.card-heading {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333333;
}

.profile-details p {
  margin-bottom: 10px;
}

.project-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.project-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f2f2f2;
}

.project-details p {
  margin-bottom: 10px;
}

.project-details ul {
  list-style-type: none;
  padding-left: 0;
}

.project-details li {
  margin-bottom: 5px;
}
</style>


<script setup>
import { studentStore } from "../stores/student";
const studentstore = studentStore();
const studentDetails = studentstore.getStudent;
</script>
