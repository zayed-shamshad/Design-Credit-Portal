<template>
  <q-ajax-bar />
  <q-layout>
    <q-header reveal class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title>
          {{ $route.name }}
        </q-toolbar-title>
        <q-item clickable v-ripple @click="shownotifs">
          <q-item-section avatar>
            <q-icon name="message">
              <q-badge floating color="red" rounded> </q-badge>
            </q-icon>
          </q-item-section>
        </q-item>
        <q-btn
          label="Logout"
          icon="logout"
          dense
          color="negative"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :width="300"
      :breakpoint="400"
      overlay
      elevated
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple @click="routetohome">
            <q-item-section avatar>
              <q-icon name="home"> </q-icon>
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="routetodept()">
            <q-item-section avatar>
              <q-icon name="square"> </q-icon>
            </q-item-section>
            <q-item-section> departments </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-dialog v-model="showNotifs">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-if="notifdetails">
          <div>
            <q-list bordered separator>
              <q-item v-for="notif in notifdetails" :key="notif">
                <q-item-section>{{ notif.project }}</q-item-section>
                <q-item-section>{{ notif.status }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none" v-else>
          there are no notifications
        </q-card-section>

        <q-card-actions right>
          <q-btn flat label="OK" color="primary" v-close-popup />
          <q-btn @click="remove" flat label="delete" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <q-page>
        <router-view> </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {Notify} from "quasar";
import io from "socket.io-client";
import { ref, onMounted, onBeforeUnmount } from "vue";
import ProjectService from "../services/getprojectservice";
import StudentService from "../services/getstudent";
import { studentStore } from "../stores/student";

import { useRouter } from "vue-router";

const router = useRouter();

const drawerLeft = ref(false);
const showNotifs = ref(false);
const socket = ref(null);
const notifs = ref(null);
const notifdetails = ref([]);
const studentstore=studentStore();
const student=ref(null);
student.value=studentstore.getStudent;

onMounted(() => {
  initializeSocket();
  if(student.value.notifs) fetchStudentNotifications();
});

onBeforeUnmount(() => {
  socket.value.disconnect();
});

async function initializeSocket() {
  socket.value = io("http://localhost:5000");
  socket.value.emit("studentRegister",(student.value.id));

  socket.value.on("studentaccepted", async (projectid, studentid) => {
    Notify.create({
        message: "You have been accepted to a project",
        position: "top",
        timeout: 12000,
        actions: [{ icon: "close", color: "white" }],
      });
    await fetchStudentNotifications();
  });
  socket.value.on("studentrejected", async (projectid, studentId) => {
    console.log("student rejected")
    Notify.create({
        message: "You have been rejected",
        position: "top",
        timeout: 2000,
        actions: [{ icon: "close", color: "white" }],
      });
    await fetchStudentNotifications();
  });
}

async function fetchProjectNotification(notifications) {
  notifdetails.value = [];
  try {
    notifications.map(async (notification) => {
      
      const res = await ProjectService.getAProject(notification.projectid);
      notifdetails.value.push({
        project : res.title,
        status  : notification.message
      });
    });
  } catch (err) {
    console.error(err);
  }
}

async function fetchStudentNotifications() {
  try {

    const response = await StudentService.getStudentById(student.value.id);
    notifs.value = response.notifs;

    studentstore.setStudent({
      ...student.value,
      notifs: response.notifs,
    });
    student.value = studentstore.getStudent;

    await fetchProjectNotification(notifs.value);

  } catch (err) {
    console.error(err);
  }
}

async function remove() {
  if(notifs.value!=null){
     try {
    await StudentService.updateStudent({
      _id: student.value.id,
      notifs: [],
    });
    studentstore.setStudent({
      ...student.value,
      notifs: [],
    });
    notifs.value = null;
    notifdetails.value = [];

  } catch (err) {
    console.error(err);
  }
  }
}

function shownotifs() {
  showNotifs.value = !showNotifs.value;
}

function logout() {
  localStorage.removeItem("studenttoken");
  router.replace("/studentloginpage");
}

function routetodept() {
  router.push({ name: "alldepartment" });
}

function routetohome() {
  router.push({ name: "home" });
}
</script>
