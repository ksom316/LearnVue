<script setup>
import {ref, computed} from 'vue'
import { supabase } from '@/lib/supabase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'


    onMounted (() => {
    console.log('Component Mounted')
    loadExpenses()
})

const router = useRouter()

async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.log(error)
        return null
    }
    
    return data.user.id
}


async function loadExpenses() {
    try {
            const userId = await getCurrentUser()

            if (!userId) {
                console.log('No logged-in user')
                return
            }

            const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .eq('user_id', userId)

            if (error) {
                console.log(error)
                return
            }

            console.log(data)
            expenses.value = data
        }
    catch(err) {
            console.log(err)
    }
}

const editingId = ref(null)
const description = ref('')
const amount = ref('')
const category = ref('')
const expenses = ref([])

async function logout(){
    const {error} = await supabase.auth.signOut()

    if (error) {
        console.log(error)
        return
    }

    router.push('/login')

}

async function saveExpense(id) {
    if (
    description.value === '' ||
    amount.value === '' ||
    category.value === ''
    ) 
    {
        console.log('Please complete all the fields')
        return
    }

    if (editingId.value !== null) {
        const { error } = await supabase
            .from('expenses')
            .update({
                description: description.value,
                amount: amount.value,
                category: category.value
            })
            .eq('id', editingId.value)
        if (error) {
            console.log(error)
            return
        }
    }

    else {
        const userId = await getCurrentUser()

        if(!userId){
             console.log('No logged-in user')
             return
        }

        const { error } = await supabase 
            .from('expenses')
            .insert({
                description: description.value,
                amount: amount.value,
                category: category.value,
                user_id: userId
            })
        
        if (error) {
            console.log(error)
            return
        }

    }

    await loadExpenses()

    description.value = ''
    amount.value = ''
    category.value = ''



}

function editExpense(expense) {
    editingId.value = expense.id
    description.value = expense.description
    amount.value = expense.amount
    category.value = expense.category
}

// async function addExpense(){
//     if(description.value === '' || amount.value === '' || category.value === '')
//         {
//             console.log('Please complete all fields')
//             return
//         }

//     const { error } = await supabase
//         .from('expenses')
//         .insert(
//             {
//                 description: description.value,
//                 amount: amount.value,
//                 category: category.value
//             }
//         )
//     if (error) {
//         console.log(error)
//         return
//     }

//     await loadExpenses()


//     description.value=''
//     amount.value=''
//     category.value=''
//     return
               
// }

// async function updateExpense(id) {
//     const { error } = await supabase
//         .from('expenses')
//         .update({
//             description: 'Updated Expense',
//             amount: 100,
//             category: 'Food'
//         })
//         .eq('id',id)

//     if (error) {
//         console.log(error)
//         return
//     }

//     await loadExpenses()
// }

async function deleteExpense(id){
    // expenses.value = expenses.value.filter((expense) => {return expense.id !== id})
    const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        return
    }

    await loadExpenses()

}

const totalExpenses = computed(() => {
   return expenses.value.reduce((total, expense) => {
    return total + expense.amount
   }, 0)

})

const numberOfExpenses = computed(() => {
    return expenses.value.length
})


const loading = ref(false)
const error = ref('')

async function loadPracticeData() {
    loading.value = true
    error.value = ''

    try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            const data = await response.json()
            console.log(data)
        } catch(err) {
            error.value = 'Failed to load data'
        } finally {
            loading.value = false
        }
    
}


</script>

<template>
    <div class="app-container">
        <header class="topbar">
            <h1>Expense Tracker</h1>

            <button @click="logout" class="logout-button">
                Logout
            </button>
        </header>

        <main class="content">
            <div class="form-card">
                 <h2>Add Expense</h2>

                 <form class="expense-form" @submit.prevent="saveExpense">
                    <label>
                        Description
                    </label>
                    <input v-model="description" type="text">

                    <label>Amount</label>
                    <input v-model.number="amount" type="number">

                    <label>Category</label>
                    <select v-model="category">
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>

                    <button type="submit">
                        {{ editingId !== null ? 'Update Expense' : 'Add Expense' }}
                    </button>
                </form>

                <p>Description: {{ description }}</p>
                <p>Amount: {{ amount }}</p>
                <p>Category: {{ category }}</p>

        <h2 class="expenses-title">Expenses</h2>

        <div class="expense-list">
            <div
                v-for="expense in expenses"
                :key="expense.id"
                class="expense-card"
            >
                <div class="expense-info">
                    <h3>{{ expense.description }}</h3>
                    <p>{{ expense.category }}</p>
                </div>

                <div class="expense-right">
                    <strong>GHS {{ expense.amount }}</strong>

                    <div class="expense-actions">
                        <button
                            class="edit-button"
                            @click="editExpense(expense)"
                                >
                                    Edit
                                </button>

                                <button
                                    class="delete-button"
                                    @click="deleteExpense(expense.id)"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="summary-cards">
                <div class="summary-card">
                    <p>Total Expenses</p>
                    <strong>GHS {{ totalExpenses }}</strong>
                </div>

                <div class="summary-card">
                    <p>Number of Expenses</p>
                    <strong>{{ numberOfExpenses }}</strong>
                </div>
                </div>

                <button type="button" @click="loadPracticeData">
                    Load Practice Data
                </button>

                <p v-if="loading">Loading...</p>
                <p v-if="error">{{ error }}</p>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>