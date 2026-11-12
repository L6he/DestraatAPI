<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { wadsServices } from '../services/wadsServices';
import type { WadSummary } from '../types/Wad';

const wads = ref<WadSummary[]>([]);
const loading = ref(false);
const error = ref("");

async function loadWads() {
    loading.value = true;
    error.value = "";

    try {
        wads.value = await wadsServices.getAll();
    } catch (err) {
        error.value = "Cannot load wads, womp womp :c";
        console.log(err);
    } finally {
        loading.value = false;
    }
}

onMounted(loadWads);
</script>

<template>
    <section>
        <!--Html-i ja vue süntaks segamisi-->
        <h2>Wads</h2>
        <button @click="loadWads">Refresh</button>
         <p v-if="loading">Loading games...</p> <!-- here we go again, v for vue -->
         <p v-else-if="error">{{ error }}</p>
         <p v-else-if="wads.length === 0">No wads found</p>
         <ul v-else> 
            <li v-for="wad in wads" :key="wad.id">
                {{ wad.WadName }} ( {{ wad.id }} )
            </li>
         </ul>
    </section>
</template>
