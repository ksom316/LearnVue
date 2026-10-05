<script setup>
import Profile from './components/Profile.vue'
import {ref} from 'vue'
import Counter from './components/Counter.vue'
import ExpenseForm from './components/ExpenseForm.vue'

const day = ref(1)
const course = {
  name:'Vue.js Fundamentals',
  instructor: 'Mr. Mensah',
  totalLessons: 10,
  completedLessons: 3
}

const topics = [
  {
    id: 1,
    name: 'Components',
    completed: true
  },

  {
    id: 2,
    name: 'Props',
    completed: true
  },

  {
    id: 3,
    name:'Reactivity',
    completed: true
  },
  
  {
    id: 4,
    name: 'Events',
    completed: false
  }
]

const students = [
  { 
    id:'1',
    name: 'Kwaku',
    course: 'Computer Science'
  },

  {
    id:'2',
    name:'Ama',
    course:'Mathematics',
  },

  {
    id:'3',
    name:'Kojo',
    course:'Engineering'
  }
]

function calculateRemaining(total, completed){
  return total-completed;
}

function nextDay(){
   day.value = day.value + 1;
}

</script>

<template>
  <!-- <div>
    <h1>Learning Vue</h1>
    <p>Day: {{ day }}</p>
    <button @click="nextDay()">Next Day</button>
    <ol>
      <Profile v-for="student in students" 
                :key="student.id" 
                :name="student.name" 
                :course="student.course" 
        />
    </ol>

    <p>Course: {{ course.name }}</p>
    <p>Instructor: {{ course.instructor }}</p>
    <p>Lessons completed: {{ course.completedLessons }}/{{ course.totalLessons }}</p>
    <p>Lessons remaining: {{calculateRemaining(course.totalLessons, course.completedLessons)}}</p>
    <h2>Topics</h2>
    <ul>
    <li v-for="topic in topics" :key="topic.id">
      {{ topic.name }} - <span v-if="topic.completed">Completed</span>
      <span v-else>Not completed</span>
    </li>
    </ul>
    <p>Number of topics: {{ topics.length }}</p>

    <Counter />

    <ExpenseForm />
  </div> -->

  <RouterView />

</template>

<style scoped>
/* CSS */
</style>