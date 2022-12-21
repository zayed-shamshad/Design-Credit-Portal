<template>
    <q-layout>
    <q-header>
        <q-toolbar>
            <q-toolbar-title>
                <q-btn flat label="Home" @click="routetohome()" />
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page-container>
        <q-page>
            <div class="q-pa-md flex justify-center align-center items-center" style="width:100vw;height:80vh;">
                <div class="justify-center q-pl-lg" style="width:700px">
                    <q-form @submit="signup" @reset="reset" ref="myform" greedy style="max-width: 500px">
                        <q-input type="email" label="email" clear-icon="clear" v-model="email" required lazy-rules="ondemand"
                            :rules="[val => val.length > 0 || 'Please type your email', val => /.+@.+/.test(val) || 'E-mail must be valid']" />
            
                        <q-input type="password" label="password" v-model="password" required lazy-rules="ondemand" :rules="[val => val.length > 0 || 'Please type your password',
                                val => val.length > 3 || 'Password must be more than 5 characters',
                                val => val.length < 15 || 'Password must be less than 15 characters']" />
                        <q-input type="text" label="username" v-model="name" required autofocus lazy-rules="ondemand"
                            :rules="[val => val.length > 0 || 'Please type your username']" />
            
            
                        <q-select v-model="department" bottom end :options="options" transition-show="flip-up" hide-dropdown-icon
                            transition-hide="flip-down" options-cover menu-offset=[100,100] label="Department" />
                        <q-select filled v-model="skillsstudent" multiple :options="skills" counter max-values="5"
                            hint="Max 5 selections" use-chips use-input />
            
                        <div class="row">
                            <q-btn type="submit" label="signup" />
                            <q-btn type="reset" color="primary" flat class="q-ml-sm" label="reset" />
                        </div>

                    </q-form>
                    <q-btn @click="login" label="signin" class="row" />
                </div>
            </div>
        </q-page>
    </q-page-container>
    </q-layout>
</template>
<script>
import studentservice from '../services/getstudent'
export default {
    name: 'studentregisterpage',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            department:"",
            skillsstudent:[],
            error: null,
            options:[
                "EE",
                "CSE",
                "ME",
                "CE",
                "MT",
                "BB",
                "CH",
                "AI"
        ],
        skills:[
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
        ]
        }
    },
    methods: {
        routetohome() {
            this.$router.push('/');
        },
        reset() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.department="";
            this.skillsstudent=[];
            this.error = null;
        },
        shownotification(type, message) {
            Notify.create({
                message: message,
                color: type,
                position: 'top',
                timeout: 2000,
                actions: [{ icon: 'close', color: 'white' }]
            });
        },
        login() {
            this.$router.replace('/studentloginpage');
        },
        async signup() {
            if (this.$refs.myform.validate()) {
            const student = await studentservice.registerstudent(this.name, this.email, this.password,  this.department,this.skillsstudent);
            if(student.status==200){
                this.$router.push('/studentloginpage');
                this.shownotification("positive", "success");
            }
            else{
                this.error="Invalid Credentials";
                this.shownotification("negative", "error");
            }
        }
    }
}
}
</script>

<style scoped>
</style>