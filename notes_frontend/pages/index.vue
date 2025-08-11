<template>
  <div class="notes-page">
    <Sidebar @noteSelected="handleNoteSelection" />
    <NoteEditor :note-id="selectedNoteId" @noteDeleted="handleNoteDeletion" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import NoteEditor from '~/components/NoteEditor.vue';

const selectedNoteId = ref<string | null>(null);

const handleNoteSelection = (noteId: string) => {
  selectedNoteId.value = noteId;
};

const handleNoteDeletion = () => {
    selectedNoteId.value = null;
}
</script>

<style scoped>
.notes-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
