<script setup lang="ts">
import { authenticationsServices } from "@/services/authenticationsServices";
import { ref } from "vue";
import router from "@/router";

const error = ref("");
const emailAddress = ref("");
const password = ref("");
const saving = ref(false);

const handleLogin = async () => {
    try {
        await authenticationsServices.login(emailAddress.value, password.value);
        router.push("/users");
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred: ', err);
        }
    }
}

</script>

<template>
    <section>
        <h2 class="h3 mb-3 font-weight-normal">Log in</h2>
        <form class="form-signin" @submit.prevent="handleLogin">
            <label for="emailAddress">Email address <span class="text-danger">*</span></label><br>
            <input id="emailAddress" v-model="emailAddress" required/><br><br>

            <label for="Password">Password <span class="text-danger">*</span></label><br>
            <input type="password" id="Password" v-model="password" required/><br><br>

            <span class="text-danger">Fields with an * (asterisk) must be filled.</span><br><br>

            <RouterLink class="nav-link" to="/register">Create an account instead.</RouterLink>

            <p v-if="error">{{ error }}</p>

            <button class="btn btn-lg btn-primary" type="submit" :disabled="saving">{{ saving ? "Logging in..." : "Log in" }}</button><br><br> 
            <!-- disabled kuvab nuppu ainult kui saving on false -->
        </form>
    </section>
</template>
