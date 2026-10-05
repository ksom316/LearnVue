import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ExpenseView from "@/views/ExpenseView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import { supabase } from "@/lib/supabase";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/expenses',
            component: ExpenseView
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/signup',
            component: SignupView
        }
    ]
})

router.beforeEach(async (to) => {
    const { data } = await supabase.auth.getSession()

    const isLoggedIn = !!data.session

    if(to.path === "/expenses" && !isLoggedIn) {
        return '/login'
    }

})

export default router