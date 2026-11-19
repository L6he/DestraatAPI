<!-- It's like createUpdate but different -->
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { wadsServices } from "../../services/wadsServices";
import type { WadInput, Category } from "../../types/Wad";

const props = defineProps<{
    wadId?: string | null
}>();

const emit = defineEmits<{
    saved: []
}>();

const categories = ref<Category[]>([]);
const error = ref("");
const saving = ref(false);

function emptyWad(): WadInput {
    return {
        "WadName": "",
        "WadDescription": "",
        "ReleaseDate": "",
        "CategoryID": "",
        "ImageURL": null
    }
}

const form = ref<WadInput>(emptyWad());

/*async function loadCategories() {
    try {
        categories.value = ["01a177d4-b30f-72a1-8d1c-ac44b029d847", "Döner"]; //mingi dummy väärtus
    }
}*/

async function loadWad() {
    error.value = "";
    if (!props.wadId) {
        form.value = emptyWad();
        return;
    }
    try {
        const wad = await wadsServices.getByID(props.wadId);
        form.value = {
            WadName: wad.WadName,
            WadDescription: wad.WadDescription,
            ReleaseDate: wad.ReleaseDate ? String(wad.ReleaseDate).slice(0, 10) : "",
            CategoryID: wad.CategoryID,
            ImageURL: wad.ImageURL,
        }
    } catch (err) {
        error.value = "Cannot load this wad.";
        console.error(err);
    }
}

async function saveWad() {
    saving.value = true;
    error.value = "";

    try {
        if (props.wadId) {
            await wadsServices.update(props.wadId, form.value);
        } else {
            await wadsServices.create(form.value);
        }

        emit("saved");

        if (props.wadId) {form.value=emptyWad()}
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

// onMounted(loadCategories);

watch( () => props.wadId, loadWad, {immediate: true} ); //vaata, et miski muutuks

</script>

<template>
    <section>
         <h2>{{ wadId ? "Edit Wad": "Create Wad" }}</h2> <!-- ternary -->

         <form @submit.prevent="saveWad">
            <label for="wadName">Wad Name</label><br>
            <input id="wadName" v-model="form.WadName" required /><br><br>

            <label for="wadDescription">Wad Description</label><br>
            <input id="wadDescription" v-model="form.WadDescription" required /><br><br>

            <label for="releaseDate">Release Date</label><br>
            <input id="releaseDate" type="date" v-model="form.ReleaseDate" required /><br><br>

            <!-- proper implementation of category needed-->
            <label for="category">Category ID</label><br>
            <input id="category" v-model="form.CategoryID" required /><br>

            <label for="imageUrl">Where image</label><br>
            <input id="imageUrl" type="url" v-model="form.ImageURL" /><br><br>

            <p v-if="error">{{ error }}</p>

            <button type="submit" :disabled="saving">
                {{ saving ? "Saving wad": "Save Wad" }}
            </button>
        </form>
    </section>
</template>