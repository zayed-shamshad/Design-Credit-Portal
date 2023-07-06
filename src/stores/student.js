import { defineStore } from 'pinia'

export const studentStore= defineStore('student', {
    state: () => ({
        student: null
    }),
    getters: {
        getStudent() {
            return this.student;
        }
    },
    actions: {
        setStudent(student) {
            this.student = student;
        }
    }
})