<script setup lang="ts">
import { ref } from "vue";
import WadsList from '../components/WadsList.vue';
import WadDetails from '../components/WadDetails.vue';
import WadForm from "../components/WadForm.vue";
import { wadsServices } from "../services/wadsServices.ts";

const selectedWadId = ref<string | null>(null);
const editing = ref(false);
const listVersion = ref(0);
const detailsVersion = ref(0);
const error = ref("");

function selectWad(id: string) {
  selectedWadId.value = id;
  editing.value = false;
}
function createWad(id: string) {
  selectedWadId.value = null;
  editing.value = true;
}

function wadSaved(id: string) {
  editing.value = false;
  listVersion.value++
  detailsVersion.value++
}

async function deleteWad() {
  if (!selectedWadId.value) {return}
  if (!confirm("Delete this game?")) {return}

  error.value = "";

  try {
    await wadsServices.delete(selectedWadId.value);
    selectedWadId.value = null;
    editing.value = false;
    listVersion.value++
  } catch (err) {
    error.value = "Cannot delete this wad.";
    console.error(err);
  }
}
</script>

<template>
    <main>
      <h1>Waddle dee!</h1>
      <button @click="createWad">Add Wad</button>
      <p v-if="error">{{ error }}</p>
      <p>
        <WadsList
          :key="listVersion" 
          @select="selectWad" />
  
          <section v-if="selectedWadId && !editing">
            <WadDetails 
            :key="`${selectedWadId}-${detailsVersion}`" 
            :wad-id="selectedWadId"/>
            <button @click="editing = true">Edit</button>
            <button @click="deleteWad">Delete</button>
          </section>
          <section v-if="editing">
            <button @click="editing = false">Cancel edit</button>
            <WadForm
              :wad-id="selectedWadId"
              @saved="wadSaved"/>
          </section>
      </p>
      <hr>
      <p>
        Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
      </p>
    </main>
  </template>