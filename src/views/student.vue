<template>
  <q-ajax-bar />
  <q-layout>
    <q-header reveal class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

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
          <q-item clickable v-ripple @click="showNotifs = true">
            <q-item-section avatar>
              <q-icon name="message">
                <q-badge floating color="red" rounded />
              </q-icon>
            </q-item-section>
            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
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
          <div class="text-weight-bold">user</div>
          <div>@user</div>
        </div>
      </q-img>
    </q-drawer>
    <q-dialog v-model="showNotifs">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          there are no notifications
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component, route }">
          <component
            :is="Component"
            v-if="route.name == 'myproject'"
            v-bind:myproject="myproject"
          >
          </component>
          <component :is="Component" v-else> </component>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import projectservice from "../services/getprojectservice";
import studentservice from "../services/getstudent";
import profservice from "../services/getprofs";
export default {
  name: "student",
  data() {
    return {
      drawerLeft: false,
      socket: null,
      showNotifs: false,
      notifs: null,
      error: null,
      name: "",
      department: "",
      email: "",
      requestsstatus: "",
      project: null,
      myproject: {
        title: "",
        description: "",
        department: "",
        deliverables: [],
        professor: "",
      },
      skills: [],
      rejected: [],
      student: null,
      notifproj: "",
    };
  },
  mounted() {
    this.socket.on("studentid", (data) => {
      console.group("student here");
      console.log(data);
    });
    this.socket.on("studentaccepted", (projectid, studentid) => {
      if (studentid == this.student) {
      }
    });
    this.socket.on(
      "studentrejected",
      (requestsstatus, notifs, studentId, title, desc, dept) => {
        if (studentId == this.student) {
          this.notifs = notifs;
          this.requestsstatus = requestsstatus;
          this.myproject.title = title;
          this.myproject.description = desc;
          this.myproject.department = dept;
        }
      }
    );
  },
  async created() {
    this.socket = io("http://localhost:5000");
    try {
      this.projects = await allprojectservice.getprojects();
    } catch (err) {
      this.error = err;
    }
    try {
      await axios
        .get("http://localhost:5000/studentregister/user", {
          headers: {
            studenttoken: localStorage.getItem("studenttoken"),
          },
        })
        .then(async (response) => {
          this.student = response.data.student._id;
          this.name = response.data.student.name;
          this.department = response.data.student.department;
          this.email = response.data.student.email;
          this.requestsstatus = response.data.student.requestsstatus;
          this.notifs = response.data.student.notifs;
          this.rejected = response.data.student.rejected;
          this.project = response.data.student.project;
          this.skills = response.data.student.skills;
          // console.log("this is the project of the student ",response.data.student.project);
          try {
            await projectservice
              .getaproject(response.data.student.project)
              .then(async (res) => {
                console.log(res);
                this.myproject.title = res.title;
                this.myproject.description = res.description;
                this.myproject.department = res.department;
                this.myproject.deliverables = res.deliverables;
                if (this.notifs != null) {
                  await projectservice
                    .getaproject(this.notifs.projectid)
                    .then((ressss) => {
                      this.notifproj = ressss.title;
                    });
                  await profservice.getprofbyid(res.professor).then((res) => {
                    this.myproject.professor = res.name;
                  });
                }
              });
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async remove() {
      this.notifs = {
        projectid: null,
        message: null,
      };
      await studentservice.updatestudent({
        id: this.student,
        notifs: this.notifs,
      });
    },
    shownotifs() {
      this.showNotifs = !this.showNotifs;
    },
    logout() {
      localStorage.removeItem("studenttoken");
      this.$router.replace("/studentloginpage");
    },
    routetodept() {
      this.$router.push({ name: "alldepartment" });
    },
  },
};
</script>
