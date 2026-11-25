<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { usersServices } from "@/services/usersServices";
import type { UserRegister } from "@/types/User";
import router from "@/router";

const props = defineProps<{
    userId?: string | null
}>();

const emit = defineEmits<{
    saved:[]
}>();

const error = ref("");
const saving = ref(false);

function emptyUser(): UserRegister {
    return {
        UserName: "",
        EmailAddress: "",
        UserStatus: null,
        SignupDate: new Date().toDateString(),
        OwnershipID: null,
        CommentListID: null,
        ProfileID: null,
        CredentialID: null,
        Password: "",
        PasswordConfirmation: null
    }
}

const form = ref<UserRegister>(emptyUser());

async function register() {
    saving.value = true
    error.value = ""

    try {
        const response = await usersServices.register(form.value);
        router.replace("/login");
        console.log("try");
    } catch (err) {
        error.value = "Saving failed.";
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred:', err);
        }
    } finally {
        saving.value = false;
    }
}
</script>

<template>
    <section>
        <h2 class="h3 mb-3 font-weight-normal">Input your personal and very very private data</h2>
        <form class="form-signin" @submit.prevent="register">
            <label for="UserName">Username <span class="text-danger">*</span></label><br>
            <input id="UserName" v-model="form.UserName" required/><br><br>

            <label for="EmailAddress">Email Address <span class="text-danger">*</span></label><br>
            <input type="email" id="EmailAddress" v-model="form.EmailAddress" required/><br><br>

            <label for="Password">Password <span class="text-danger">*</span></label><br>
            <input type="password" id="Password" v-model="form.Password" required/><br><br>

            <label for="PasswordConfirmation">Confirm Password <span class="text-danger">*</span></label><br>
            <input type="password" id="PasswordConfirmation" v-model="form.PasswordConfirmation" required/><br><br>

            <span class="text-danger">Fields with an * (asterisk) must be filled.</span><br><br>

            <p v-if="error">{{ error }}</p>

            <RouterLink class="nav-link" to="/login">Log in instead.</RouterLink>

            <button class="btn btn-lg btn-primary" type="submit" :disabled="saving">{{ saving ? "Registering..." : "Register" }}</button><br><br> 
            <!-- disabled kuvab nuppu ainult kui saving on false -->
        </form>
    </section>
</template>
