<template>
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
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

                    <q-card-section>
                      <div class="text-overline text-orange-9">
                        positions open :{{ project.number }}
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        {{ project.title }}
                      </div>
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
                          expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click="expanded = !expanded"
                      />
                    </q-card-actions>

                    <q-slide-transition>
                      <div v-show="expanded">
                        <q-separator />
                        <q-card-section class="text-subitle2">
                           Description:
                          {{ project.description }}
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
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

                    <q-card-section>
                      <div class="text-overline text-orange-9">
                        positions open :{{ project.number }}
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        {{ project.title }}
                      </div>
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

                    <q-card-actions>
                      <q-btn v-on:click="deleteproject(project._id)"
                        >Delete</q-btn
                      >
                      <q-btn v-on:click="showeditform(project._id)">Edit</q-btn>
                         <q-btn @click="checkoutproject(project._id)"
                        >Evaluate
                      </q-btn>

                      <q-space />

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                        :icon="
                          expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click="expanded = !expanded"
                      />
                    </q-card-actions>

                    <q-slide-transition>
                      <div v-show="expanded">
                        <q-separator />
                        <q-card-section class="text-subitle2">
                          Description:
                          {{ project.description }}
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
</template>
<script>
export default{
    name:"professorhome",
    data(){
        return{

          
        }
    },
    methods:{
        checkoutproject(projectid) {
      this.$router.push("project/" + projectid);
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
}

</script>