<script setup lang="ts">
import {ref, watch} from "vue";
import { wadsServices } from "@/services/wadsServices";
import type {Wad} from "../../types/Wad";

const props = defineProps<{
    wadId: string
}>();

const wad = ref<Wad | null>(null);
const error = ref("");
const loading = ref(false);

async function loadWad(id:string) {
    wad.value = null;
    loading.value = true;
    error.value = "";

    try {
        wad.value = await wadsServices.getByID(id);
    } catch (err) {
        error.value = "Cannot get wad.";
        console.error(err);
    } finally {
        loading.value = false;
    }
}

watch( () => props.wadId, loadWad, {immediate: true});
</script>

<template>
    <section>
        <h2>Wad Details</h2>
            <hr>
        <p v-if="loading">Loading wad info...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="wad">
            <h3>{{ wad.WadName }}</h3>
            <p>{{ wad.WadDescription }}</p>
            <p>Released {{ wad.ReleaseDate }}</p>
            <!-- <p><img src="{{ wad.imageURL }}" alt=""></p> -->
            <p>Category {{ wad.CategoryID }}</p>
            <p>{{ wad.Downloads }} downloads</p>
            <p>{{ wad.Comments }}</p>
        </div>
    </section>
</template>