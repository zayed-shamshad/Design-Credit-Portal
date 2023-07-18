<template>
  <q-page padding>
        <div v-if="projects.length != 0">
          <div v-if="getopenprojects.length!=0">
             <h3>
            Open Projects
          </h3>
          <div class="department-container row">
            <div class="row justify-center q-gutter-sm">
              <div
                v-for="(project, index) in getopenprojects"
                :item="project"
                :index="index"
                :key="project._id"
                class="q-pa-md flex flex-center relative-position example-item"
              >
                <transition name="q-transition--scale">
                  <q-card class="my-card" flat bordered>
                    <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->

                    <q-card-section>
                      <div class="text-overline text-orange-9">
                        positions open :{{ project.number }}
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        {{ project.title }}
                      </div>
                      Description:
                          {{ project.description }}
                     
                    </q-card-section>

                    <q-card-actions>
                      <q-btn v-on:click="deleteproject(project._id)"
                        >Delete</q-btn
                      >
                      <q-btn v-on:click="showeditform(project._id)">Edit</q-btn>

                      <q-space />

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                        :icon="
                          expanded[project._id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click="
                        toggle(project._id)
                        "
                      />
                    </q-card-actions>

                    <q-slide-transition>
                      <div v-show="expanded[project._id]">
                        <q-separator />
                        <q-card-section class="text-subitle2">

                             <div class="col">
                        <div
                          class="text-caption text-grey"
                          v-for="deliverable in project.deliverables"
                          :key="deliverable"
                        >

                      
                            <div class="flex items-center justify-between">
                            <div>
                              {{ deliverable.title }}
                            </div>
                            <div>
                              <q-icon
                                v-if="!deliverable.completed"
                                name="close"
                              />
                              <q-icon
                                v-if="deliverable.completed"
                                name="check"
                              />
                            </div>
                          </div>
                              
                        </div>

                         
                      </div>
                          
                        </q-card-section>
                      </div>
                    </q-slide-transition>
                  </q-card>
                </transition>
              </div>
            </div>
          </div>
           </div>
           <div v-if="getclosedprojects.length!=0" >
              <h3>Ongoing Projects!</h3>
          
          <div class="department-container row">
          
            <div class="row justify-center q-gutter-sm">
              <div
                v-for="(project, index) in getclosedprojects"
                :item="project"
                :index="index"
                :key="project._id"
                class="q-pa-md flex flex-center relative-position example-item"
              >
                <transition name="q-transition--scale">
                   <q-card class="my-card" flat bordered>
                    <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->

                    <q-card-section>
                      <div class="text-overline text-orange-9">
                        positions open :{{ project.number }}
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        {{ project.title }}
                      </div>
                        Description:
                          {{ project.description }}
                     
                    </q-card-section>

                    <q-card-actions>
                      <q-btn v-on:click="deleteproject(project._id)"
                        >Delete</q-btn
                      >
                      <q-btn v-on:click="showeditform(project._id)">Edit</q-btn>
                         <q-btn @click="checkoutproject(project._id)"
                        >
                        Evaluate
                      </q-btn>

                      <q-space />

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                        :icon="
                          expanded[project._id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click="toggle(project._id)"
                      />
                    </q-card-actions>

                    <q-slide-transition>
                      <div v-show="expanded[project._id]">
                        <q-separator />
                        <q-card-section class="text-subitle2">

                             <div class="col">
                        <div
                          class="text-caption text-grey"
                          v-for="deliverable in project.deliverables"
                          :key="deliverable"
                        >
                          <div class="flex items-center justify-between">
                            <div>
                              {{ deliverable.title }}
                            </div>
                            <div>
                              <q-icon
                                v-if="!deliverable.completed"
                                name="close"
                              />
                              <q-icon
                                v-if="deliverable.completed"
                                name="check"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                        
                        </q-card-section>
                      </div>
                    </q-slide-transition>
                  </q-card>
                </transition>
              </div>
            </div>
          </div>
           </div>
        </div>
        <div v-else>
          <div class="text-h6">No projects</div>
        </div>
      </q-page>
     <q-dialog v-model="showedit">
      <q-card>
        <q-card-section class="row items-center">
          <q-form @submit="updateproject" @reset="resetedit">
            <q-input type="text" v-model="editProject.title" required />
            <q-input type="textarea" label="description" v-model="editProject.description" required />

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

             :style="{
                'max-width': '500px',
              }"
             
            />
            <q-select
              :options="statusproject"
              v-model="editProject.evaluationstatus"
              label="project evaluation"
            />
            <q-checkbox v-model="editProject.status" label="open/close" />
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
</template>
<script>

import AllProjectService from "../services/getallprojects";
import ProjectService from "../services/getprojectservice";
import ProfService from "../services/getprofs";
export default{
    name:"professorhome",
    data(){
        return {
            error: null,
      statusproject: ["notEvaluated", "Evaluated", "pending"],
      openCloseStatuslabel: ["open", "close"],
      openCloseStatusvalue: [true, false],
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
              expanded: {},

        showedit: false,
      projects: [],
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
        }
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
    async created(){
      
        await this.getprof();
        this.projects = await AllProjectService.getProjectsByProf(
      this.professor.id
    );
    },
    methods:{
        toggle(id) {
        this.expanded[id]= !this.expanded[id];
        },
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
    checkoutproject(projectid) {
      this.$router.push(`/project/${projectid}`);
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
        showeditform(projectid) {
      const ind = this.projects.findIndex(
        (project) => project._id === projectid
      );
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
    async deleteproject(deletedProjectId) {
      try {
        const index = this.projects.findIndex(
          (project) => project._id === deletedProjectId
        );
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
              completed: false,
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

        this.projects.forEach((project) => {
           this.expanded[project._id]=false;
        });
        console.log("projects are", this.projects);
      } catch (err) {
        console.log(err);
        this.error = err;
      }
    },
    }
}
</script>