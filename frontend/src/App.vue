<script setup lang="ts">
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth.ts";

import WadsView from "./views/WadsView.vue";
// teiste vaadete impordid käivad siia ka

const { user, logout } = useAuth();
</script>

<template>
  <div>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar brand text-light" href="../">Destraat</a>

        <!-- validate that user is logged in here, block off any routerlinks that unlogged in user shouldn't have access to -->

        <RouterLink id="RL_Wads" class="nav-link" to="/wads">Wads</RouterLink> <!-- admin access only -->
        
        <!-- /catalog endpoint for the users to see, /wads with no edit, delete or create -->

        <RouterLink id="RL_Users" class="nav-link" to="/users">Users</RouterLink><!-- admin has access to /users routerlink -->

        <div v-if="user">
          <span >Hello, {{ user.UserName }}!</span>
          <button type="button" class="text-danger nav-link navbar-nav ml-auto" @click="logout">Log out</button>
        </div>

        <RouterLink v-if="!user" id="RL_SignUp" class="nav-link navbar-nav ml-auto" to="/login">Sign in&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg></RouterLink><!-- guest only -->
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
