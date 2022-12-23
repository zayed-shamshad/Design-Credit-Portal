<template>
    <q-layout view="hhh LpR fFf">
        <q-header reveal elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    Design Credit Registration portal
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page class="row justify-center">
                <div class="row justify-center items-center" >
                <q-card class="my-card">
                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6">professor</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="center">
                        <q-btn flat @click="routetologinprof()">portal</q-btn>
                    </q-card-actions>
                </q-card>
                <q-card class="my-card">
                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6">student</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="center">
                        <q-btn flat @click="routetologinstudent()">portal</q-btn>
                    </q-card-actions>
                </q-card>
                </div>
            </q-page>
        </q-page-container>
        <q-footer bordered class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>

export default {
    name: 'HomeView',
    data(){
        return {
        }
    },
    methods: {
        routetologinstudent(){
            this.$router.push('/studentloginpage')
        },
        routetologinprof(){
            this.$router.push('/professorloginpage')
        }
    },
}
</script>
<style scoped>
.my-card{
    width: 300px;
    max-width: 300px;
}
</style>


