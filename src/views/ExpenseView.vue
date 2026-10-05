<script setup>
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import ExpenseForm from '@/components/ExpenseForm.vue'


    onMounted (() => {
    console.log('Component Mounted')
    loadExpenses()
})

async function loadExpenses() {
    try {
            const { data, error } = await supabase
            .from('expenses')
            .select('*')

            if (error) {
                console.log(error)
                return
            }

            console.log(data)
        }
    catch(err) {
            console.log(err)
    }
}

async function updateExpense(id) {
    const { error } = await supabase
        .from('expenses')
        .update({
            description: 'Updated Expense',
            amount: 100,
            category: 'Food'
        })
        .eq('id',id)

    if (error) {
        console.log(error)
        return
    }

    await loadExpenses()
}



</script>

<template>
    <h1>Expenses</h1>
    <!-- <p>Your expenses will appear here.</p> -->
    <ExpenseForm />

</template>

<style scoped>

</style>