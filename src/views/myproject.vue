<template>
            <div class="q-pa-sm flex flex-center relative-position example-item">
                <transition name="q-transition--scale">
                    <q-card>
                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                        <q-card-section>
                            Title:
                            <h2>{{ myproject.title }}</h2>
                            Description:
                            <p>{{ myproject.description }}</p>
                            Department:
                            <p>{{ myproject.department }}</p>
                            Deliverable 1:
                            <p>{{ myproject.deliverables[0] }}</p>
                            Deliverable 2:
                            <p>{{ myproject.deliverables[1] }}</p>
                            Deliverable 3:
                            <p>{{ myproject.deliverables[2] }}</p>
                            Professor:
                            <p>{{ myproject.professor }}</p>
                        </q-card-section>
                    </q-card>
                </transition>
            </div>
</template>
<script>
export default{
    name: 'myproject',
    props: {
         myproject: {
             type: Object,
             default: ''
         },
    },

}
</script>
<style scoped>
.example-item {
    height: 400px;
    width: 400px;
}

</style>