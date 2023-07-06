<template>
  <q-ajax-bar color="primary" />
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="opendrawer = !opendrawer" />
        <q-btn @click="showcreateproject = true" flat v-ripple>
          <q-icon name="add" />
        </q-btn>

        <q-toolbar-title> portal </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div v-if="showopen" class="department-container row">
          <div class="row justify-center q-gutter-sm">
            <div
              v-for="(project, index) in getopenprojects"
              :item="project"
              :index="index"
              :key="project._id"
              class="q-pa-md flex flex-center relative-position example-item"
            >
              <transition name="q-transition--scale">
                <q-card>
                  <q-card-section>
                    <h3>{{ project.title }}</h3>
                    <p class="text">{{ project.description }}</p>
                    <p class="text">{{ project.number }}</p>
                    <q-btn v-on:click="deleteproject(index)">Delete</q-btn>
                    <q-btn v-on:click="showeditform(index)">Edit</q-btn>
                  </q-card-section>
                </q-card>
              </transition>
            </div>
          </div>
        </div>
        <div v-if="showclosed" class="department-container row">
          <div class="row justify-center q-gutter-sm">
            <div
              v-for="(project, index) in getclosedprojects"
              :item="project"
              :index="index"
              :key="project._id"
              class="q-pa-md flex flex-center relative-position example-item"
            >
              <transition name="q-transition--scale">
                <q-card>
                  <q-card-section>
                    <h3>{{ project.title }}</h3>
                    <p class="text">{{ project.description }}</p>
                    <p class="text">{{ project.number }}</p>
                    <q-btn v-on:click="showeditform(index)">Edit </q-btn>
                    <q-btn @click="checkoutproject(index)">checkout </q-btn>
                  </q-card-section>
                </q-card>
              </transition>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-drawer
      v-model="opendrawer"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
      overlay
      elevated
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> home </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="showNotifs = true">
            <q-item-section avatar>
              <q-icon name="message" />
            </q-item-section>
            <q-item-section> notifications </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="showopenp">
            <q-item-section avatar>
              <q-icon name="laptop" />
            </q-item-section>
            <q-item-section> open projects </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="showclosedp">
            <q-item-section avatar>
              <q-icon name="close" />
            </q-item-section>
            <q-item-section> close projects </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-footer> </q-footer>

    <q-dialog v-model="showcreateproject">
      <q-card>
        <q-card-section class="row items-center">
          <q-form @submit="addproject" @reset="reset">
            <q-input
              type="text"
              v-model="project.title"
              placeholder="add title"
              required
            />
            <q-input
              type="text"
              v-model="project.description"
              placeholder="add description"
              required
            />
            <q-input
              type="number"
              v-model="project.number"
              placeholder="add number of students"
              required
            />
            <q-select
              v-model="project.department"
              bottom
              end
              :options="departments"
              transition-show="flip-up"
              hide-dropdown-icon
              transition-hide="flip-down"
              options-cover
              menu-offset="[100,100]"
              label="Department"
            />
            <q-select
              label="deliverables"
              filled
              v-model="project.deliverables"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              style="width: 250px"
            />
            <q-select
              label="skills required"
              filled
              v-model="project.skills"
              multiple
              :options="options"
              counter
              max-values="5"
              hint="Max 5 selections"
              use-chips
              use-input
            />
            <div>
              <q-btn type="submit" label="submit" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions :align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showedit">
      <q-card>
        <q-card-section class="row items-center">
          <q-form @submit="updateproject" @reset="resetedit">
            <q-input type="text" v-model="editProject.title" required />
            <q-input type="text" v-model="editProject.description" required />
            <q-input type="number" v-model="editProject.number" required />
            <q-select
              label="deliverables"
              filled
              v-model="editProject.deliverables"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              style="width: 250px"
            />
            <q-select
              :options="statusproject"
              v-model="editProject.status"
              label="project evaluation"
            />
            <q-select
              v-model="editProject.department"
              bottom
              end
              :options="departments"
              transition-show="flip-up"
              hide-dropdown-icon
              transition-hide="flip-down"
              options-cover
              menu-offset="[100,100]"
              label="Department"
            />
            <q-select
              label="skills required"
              filled
              v-model="editProject.skills"
              multiple
              :options="options"
              counter
              max-values="5"
              hint="Max 5 selections"
              use-chips
              use-input
            />
            <div>
              <q-btn type="submit" label="submit" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions :align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showNotifs" class="col justify-center">
      <q-card v-if="notifproject.length === 0">
        <q-card-section>
          <div class="text-h6">Notifications</div>
        </q-card-section>
        <q-card-section class="q-pt-none"> no notifs </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>

      <q-card
        v-else
        class="col items-center justify-center"
        style="max-width: 500px"
      >
        <q-card class="flex items-center justify-between align-center" elevated>
          <q-card-section> Name </q-card-section>
          <q-card-section> Department </q-card-section>
          <q-card-section> Project Title </q-card-section>
        </q-card>

        <q-card
          class="flex items-center justify-between align-center"
          elevated
          v-for="(notification, ind) in notifproject"
          :key="ind"
          :value="notification"
        >
          <q-card-section>
            {{ notification.title }}
          </q-card-section>
          <q-card-section>
            {{ notification.department }}
          </q-card-section>
          <q-card-section>
            {{ notification.title }}
          </q-card-section>
          <q-card-action>
            <q-btn @click="acceptstudent(ind)"> accept </q-btn>
            <q-btn @click="rejectstudent(ind)"> reject </q-btn>
          </q-card-action>
        </q-card>
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import io from "socket.io-client";
import AllProjectService from "../services/getallprojects";
import ProjectService from "../services/getprojectservice";
import ProfService from "../services/getprofs";
import StudentService from "../services/getstudent";
export default {
  name: "professor",
  data() {
    return {
      statusproject: ["notEvaluated", "Evaluated", "pending"],
      departments: ["CSE", "EE", "ME", "CH", "BB", "AI", "CI", "MT"],
      options: [
        "web development",
        "app development",
        "machine learning",
        "data science",
        "blockchain",
        "cloud computing",
        "cyber security",
        "networking",
        "embedded systems",
        "robotics",
        "iot",
        "digital marketing",
        "ui/ux",
        "game development",
        "cyber security",
        "networking",
        "embedded systems",
        "robotics",
        "iot",
        "Vue.js",
        "React.js",
        "Angular.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "Python",
        "Java",
        "C++",
        "C",
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "Ruby",
        "Swift",
        "Kotlin",
        "flutter",
        "Django",
        "Laravel",
        "Spring",
        "ASP.NET",
        "flask",
        "Ruby on Rails",
        "Bootstrap",
        "Materialize",
        "Tailwind",
        "Sass",
        "Less",
        "jQuery",
        "React Native",
        "Ionic",
        "Android",
        "iOS",
        "Firebase",
        "AWS",
        "Azure",
        "GCP",
        "Heroku",
        "Netlify",
        "Digital Ocean",
        "Vercel",
        "Github",
        "Gitlab",
        "Bitbucket",
        "Jira",
        "Trello",
        "Agile",
        "Scrum",
        "Kanban",
      ],

      opendrawer: false,
      showNotifs: false,
      showopen: true,
      showclosed: true,
      showcreateproject: false,
      socket: null,
      showedit: false,
      projects: [],

      project: {
        title: "",
        description: "",
        number: 0,
        students: [],
        skills: [],
        deliverables: [],
        status: true,
        department: "",
        evaluationstatus: "notEvaluated",
      },
      professor: {
        id: "",
        name: "",
        email: "",
        department: "",
        projects: [],
        notifs: [],
      },

      editProject: {
        index: 0,
        title: "",
        description: "",
        number: 0,
        status: true,
        department: "",
        skills: [],
        deliverables: [],
        evaluationstatus: "",
      },
      error: null,
      notifstudent: [],
      notifproject: [],
    };
  },

  computed: {
    getopenprojects() {
      return this.projects.filter(
        (project) => project.status == true && project.number > 0
      );
    },
    getclosedprojects() {
      return this.projects.filter(
        (project) => project.status == false || project.number == 0
      );
    },
  },
  async created() {
    this.socket = io("http://localhost:5000");
    await this.getprof();
    this.socket.emit("professorConnect", this.professor.id);
    this.projects = await AllProjectService.getProjectsByProf(
      this.professor.id
    );
    await this.fetchNotification();
  },
  async mounted() {
    console.log(this.notifstudent.length);
    this.socket.on("newNotification", async (data) => {
      await this.getprof();
      await this.fetchNotification();
      console.log("i m in sockettt", data);
    });
  },
  methods: {
    async getprof() {
      const { prof } = await ProfService.getProfByToken();
      const { _id, name, email, department, projects, notifs } = prof;
      this.professor = {
        id: _id,
        name,
        email,
        department,
        projects,
        notifs,
      };
    },
    async fetchNotification() {
      this.notifstudent = [];
      this.notifproject = [];
      if (!this.professor.notifs || this.professor.notifs.length === 0) {
        return;
      }
      await Promise.all(
        this.professor.notifs.map(async (notif) => {
          const student = await StudentService.getStudentById(notif.studentid);
          const project = await ProjectService.getAProject(notif.projectid);

          this.notifstudent.push(student);
          this.notifproject.push(project);
        })
      );
    },
    resetedit() {
      this.editProject.title = "";
      this.editProject.description = "";
      this.editProject.number = 0;
      this.editProject.status = true;
      this.editProject.department = "";
      this.editProject.skills = [];
      this.editProject.deliverables = [];
      this.editProject.evaluationstatus = "notEvaluated";
    },
    reset() {
      this.project.title = "";
      this.project.description = "";
      this.project.number = 0;
      this.project.status = true;
      this.project.department = "";
      this.project.skills = [];
      this.project.deliverables = [];
      this.project.evaluationstatus = "notEvaluated";
    },
    checkoutproject(index) {
      this.$router.push("/project/" + this.getclosedprojects[index]._id);
    },

    showopenp() {
      this.showopen = !this.showopen;
    },
    showclosedp() {
      this.showclosed = !this.showclosed;
    },
    showcreateprojectbox() {
      this.showcreateproject = true;
    },
    logout() {
      localStorage.removeItem("professortoken");
      this.$router.replace("/professorloginpage");
    },

    showeditform(ind) {
      this.showedit = true;
      this.editProject.index = ind;

      this.editProject.title = this.projects[ind].title;
      this.editProject.description = this.projects[ind].description;
      this.editProject.number = this.projects[ind].number;
      this.editProject.status = this.projects[ind].status;
      this.editProject.department = this.projects[ind].department;
      this.editProject.skills = this.projects[ind].skills;
      this.editProject.deliverables = this.projects[ind].deliverables.map(
        (deliverable) => {
          return deliverable.title;
        }
      );
      this.editProject.evaluationstatus = this.projects[ind].evaluationstatus;
    },
    async deleteproject(index) {
      try {
        const deletedProjectId = this.projects[index]._id;
        await ProjectService.deleteProject(deletedProjectId);
        this.projects.splice(index, 1);

        const { _id, name, email, department, notifs } = this.professor;
        const updatedProf = {
          _id,
          name,
          email,
          department,
          projects: this.projects,
          notifs,
        };

        await ProfService.updateProf(updatedProf);
      } catch (err) {
        this.error = err;
      }
    },
    async updateproject() {
      try {
        const index = this.editProject.index;
        const projectToUpdate = this.projects[index];
        const updatedProject = {
          ...projectToUpdate,
          title: this.editProject.title,
          description: this.editProject.description,
          number: this.editProject.number,
          status: this.editProject.status,
          department: this.editProject.department,
          skills: this.editProject.skills,
          deliverables: this.editProject.deliverables.map((deliverable) => {
            return {
              title: deliverable,
              status: false,
            };
          }),
          evaluationstatus: this.editProject.evaluationstatus,
        };
        console.log("updated", updatedProject);

        await ProjectService.updateProject(updatedProject);

        await this.fetchProjectsByProf();
      } catch (err) {
        this.error = err;
      }
    },

    async fetchProjectsByProf() {
      try {
        this.projects = await AllProjectService.getProjectsByProf(
          this.professor.id
        );
        console.log("projects are", this.projects);
      } catch (err) {
        this.error = err;
      }
    },

    async acceptstudent(ind) {
      const notifProject = this.notifproject[ind];
      const notifStudent = this.notifstudent[ind];
      const updatedProject = {
        ...notifProject,
        number: notifProject.number - 1,
        students: [...notifProject.students, notifStudent._id],
      };

      const updatedProfessor = {
        ...this.professor,
        notifs: this.professor.notifs.filter((_, index) => index !== ind),
      };

      const newNotifs = notifStudent.notifs.push({
        projectid: notifProject._id,
        message: "accepted",
      });

      const updatedStudent = {
        ...notifStudent,
        notifs: newNotifs,
        project: notifProject._id,
      };

      console.log("updated prof", updatedProfessor);

      await Promise.all([
        ProfService.updateProf(updatedProfessor),
        ProjectService.updateProject({
          ...notifProject,
          number: updatedProject.number,
          status: updatedProject.number === 0 ? false : notifProject.status,
          students: updatedProject.students,
        }),
        StudentService.updateStudent(updatedStudent),
      ]);
      await this.getprof();
      await this.fetchNotification();
      this.fetchProjectsByProf();
      this.socket.emit("acceptstudent", notifStudent.project, notifStudent._id);
    },
    async rejectstudent(ind) {
      const notifProject = this.notifproject[ind];
      const notifStudent = this.notifstudent[ind];

      const updatedProfessor = {
        _id: this.professor.id,
        notifs: this.professor.notifs.filter((_, index) => index !== ind),
      };
      notifStudent.notifs.push({
        projectid: notifProject._id,
        message: "rejected",
      });

      notifStudent.rejected.push(notifProject._id);

      const newNotifs = notifStudent.notifs;
      const newrejected = notifStudent.rejected;

      const updatedStudent = {
        ...notifStudent,
        notifs: newNotifs,
        rejected: newrejected,
      };
      await Promise.all([
        ProfService.updateProf(updatedProfessor),
        StudentService.updateStudent(updatedStudent),
      ]);

      console.log("updated student", updatedStudent);

      await this.getprof();
      await this.fetchNotification();
      await this.fetchProjectsByProf();
      this.socket.emit("rejectstudent", notifProject._id, notifStudent._id);
    },
    async addproject() {
      try {
        const projectData = {
          title: this.project.title,
          description: this.project.description,
          status: this.project.status,
          number: this.project.number,
          department: this.project.department,
          skills: this.project.skills,
          deliverables: this.project.deliverables.map((deliverable) => {
            return {
              title: deliverable,
              status: false,
            };
          }),
          professor: this.professor.id,
          evaluationstatus: this.project.evaluationstatus,
        };
        const createdProject = await ProjectService.insertProject(projectData);
        console.log("created project", createdProject);
        this.project.title = "";
        this.project.description = "";
        this.project.number = 0;
        this.project.status = true;
        this.project.department = "";
        this.project.skills = [];
        this.project.deliverables = [];
        this.project.evaluationstatus = "notEvaluated";
        this.professor.projects.push(createdProject.data._id);
        console.log("professor", this.professor);

        await ProfService.updateProf({
          _id: this.professor.id,
          projects: this.professor.projects,
        });
        await this.fetchProjectsByProf();
      } catch (err) {
        this.error = err;
        console.log(err);
      }
    },
  },
};
</script>
