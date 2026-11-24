<script setup lang="ts">

import { ref } from "vue";
import RegisterForm from "@/components/user/RegisterForm.vue";

const selectedUserId = ref<string | null>(null);

    function selectUser(id:string) {
        selectedUserId.value = id;
    }
</script>

<template>
    <div>
        <RegisterForm class="text-center"/>
    </div>
</template>
