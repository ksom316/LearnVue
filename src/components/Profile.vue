<script setup>
// const name = 'Kwaku'
// const framework = 'Vue'
defineProps({
    name: String,
    course: String
})

</script>

<template>
    <div>
        <p>Name: {{ name }}</p>
        <p>Course: {{ course }}</p>
    </div>
</template>


<style scoped>
</style>