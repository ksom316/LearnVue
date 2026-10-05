<script setup>

import {ref} from 'vue';

    const count = ref(0)
    function increase(){
        count.value=count.value + 1;
    }
</script>

<template>
    <div>
        <p>Practice Counter</p>
        <p>Count: {{ count }}</p>
        <button @click="increase">Increase</button>
    </div>
</template>

<styles scoped>
</styles>